package com.iluna.mission.module;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.mediapipe.components.FrameProcessor;
import com.google.mediapipe.formats.proto.LandmarkProto;
import com.google.mediapipe.framework.AndroidAssetUtil;
import com.google.mediapipe.framework.AndroidPacketCreator;
import com.google.mediapipe.framework.Packet;
import com.google.mediapipe.framework.PacketGetter;
import com.google.mediapipe.glutil.EglManager;
import com.iluna.mission.util.BitmapConverter;
import com.iluna.mission.util.BitmapProducer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MissionRockPaperScissorsModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private ApplicationInfo applicationInfo;
    private EglManager eglManager;
    private FrameProcessor processor;
    private BitmapConverter converter;
    private BitmapProducer producer;
    private List<LandmarkProto.NormalizedLandmarkList> handLandmarks;
    private boolean isPacket;
    private Runnable handRunnable;
    private String predict;
    private Thread predictThread;
    private static final String TAG = "MissionRPSModule";
    private static final boolean FLIP_FRAMES_VERTICALLY = true;
    private static final int NUM_HANDS = 1;
    private static final String INPUT_NUM_HANDS_SIDE_PACKET_NAME = "num_hands";
    private static final String OUTPUT_LANDMARKS_STREAM_NAME = "hand_landmarks";

    MissionRockPaperScissorsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "MissionRockPaperScissors";
    }

    @ReactMethod
    public void predict(String raw, Callback success, Callback error) {
        predictThread = Thread.currentThread();

        try {
            isPacket = false;
            predict = "pending";

            byte[] image = Base64.decode(raw, Base64.DEFAULT);
            Bitmap bmp = BitmapFactory.decodeByteArray(image, 0, image.length);
            producer.predict(bmp);

            synchronized (predictThread){
                predictThread.wait(700);
            }

            if(!isPacket) predict = "None";

//            Log.d(TAG, "predict: " + predict);

            success.invoke(predict);
        } catch (Exception e) {
            error.invoke(e.getMessage());
        }
    }

    @ReactMethod
    private void init() {
        Thread initThread = Thread.currentThread();
        Activity activity = reactContext.getCurrentActivity();

        try {
            applicationInfo =
                    activity.getPackageManager().getApplicationInfo(activity.getPackageName(), PackageManager.GET_META_DATA);
        } catch (PackageManager.NameNotFoundException e) {
            Log.e(TAG, "Cannot find application info: " + e);
        }

        AndroidAssetUtil.initializeNativeAssetManager(activity);

        eglManager = new EglManager(null);

        processor =
                new FrameProcessor(
                        activity,
                        eglManager.getNativeContext(),
                        applicationInfo.metaData.getString("binaryGraphHand"),
                        applicationInfo.metaData.getString("inputVideoStream"),
                        applicationInfo.metaData.getString("outputVideoStream"));

        processor
                .getVideoSurfaceOutput()
                .setFlipY(
                        applicationInfo.metaData.getBoolean("flipFramesVertically", FLIP_FRAMES_VERTICALLY));

        AndroidPacketCreator packetCreator = processor.getPacketCreator();
        Map<String, Packet> inputSidePackets = new HashMap<>();
        inputSidePackets.put(INPUT_NUM_HANDS_SIDE_PACKET_NAME, packetCreator.createInt32(NUM_HANDS));
        processor.setInputSidePackets(inputSidePackets);

        handRunnable = new Runnable() {
            @Override
            public void run() {
                String result = handGestureCalculator(handLandmarks);
                if (result != null && predict!=null) predict = result;

                synchronized (this) {
                    this.notify();
                }
            }
        };

        processor.addPacketCallback(
                OUTPUT_LANDMARKS_STREAM_NAME,
                (packet) -> {
                    isPacket = true;
                    handLandmarks = PacketGetter.getProtoVector(packet, LandmarkProto.NormalizedLandmarkList.parser());

                    synchronized (handRunnable){
                        activity.runOnUiThread(handRunnable);

                        try {
                            handRunnable.wait();

                            synchronized (predictThread){
                                predictThread.notify();
                            }
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                });

        converter = new BitmapConverter(eglManager.getContext());
        converter.setConsumer(processor);

        producer = new BitmapProducer();
        producer.setFrameListener(activity, converter);

        synchronized (initThread){
            try{
                initThread.wait(5000);
            } catch (InterruptedException e){
                e.printStackTrace();
            }
        }
    }

    @ReactMethod
    public void close(){
        producer.interrupt();
    }

    private String handGestureCalculator(List<LandmarkProto.NormalizedLandmarkList> handLandmarks) {
        if (handLandmarks.isEmpty()) return null;

        List<LandmarkProto.NormalizedLandmark> landmarkList = handLandmarks.get(0).getLandmarkList();

        LandmarkProto.NormalizedLandmark firstFingerPoint1 = landmarkList.get(5);
        LandmarkProto.NormalizedLandmark firstFingerPoint2 = landmarkList.get(8);
        LandmarkProto.NormalizedLandmark secondFingerPoint1 = landmarkList.get(9);
        LandmarkProto.NormalizedLandmark secondFingerPoint2 = landmarkList.get(12);
        LandmarkProto.NormalizedLandmark thirdFingerPoint1 = landmarkList.get(13);
        LandmarkProto.NormalizedLandmark thirdFingerPoint2 = landmarkList.get(16);
        LandmarkProto.NormalizedLandmark fourthFingerPoint1 = landmarkList.get(17);
        LandmarkProto.NormalizedLandmark fourthFingerPoint2 = landmarkList.get(20);

        float firstFingerDist = getDistance(firstFingerPoint1.getX(), firstFingerPoint1.getY(), firstFingerPoint2.getX(), firstFingerPoint2.getY());
        float secondFingerDist = getDistance(secondFingerPoint1.getX(), secondFingerPoint1.getY(), secondFingerPoint2.getX(), secondFingerPoint2.getY());
        float thirdFingerDist = getDistance(thirdFingerPoint1.getX(), thirdFingerPoint1.getY(), thirdFingerPoint2.getX(), thirdFingerPoint2.getY());
        float fourthFingerDist = getDistance(fourthFingerPoint1.getX(), fourthFingerPoint1.getY(), fourthFingerPoint2.getX(), fourthFingerPoint2.getY());

        float fingerDistLimit = 3.0f;
        float pointDistLimit = 0.15f;

        float fromFirstToSecond = ((firstFingerDist>secondFingerDist) ? (firstFingerDist/secondFingerDist) : (secondFingerDist/firstFingerDist)) - 1;
        float fromSecondToThird = ((secondFingerDist>thirdFingerDist) ? (secondFingerDist/thirdFingerDist) : (thirdFingerDist/secondFingerDist)) - 1;
        float fromThirdToFourth = ((thirdFingerDist>fourthFingerDist) ? (thirdFingerDist/fourthFingerDist) : (fourthFingerDist/thirdFingerDist)) - 1;

        float f_3_7 = getDistance(landmarkList.get(3).getX(), landmarkList.get(3).getY(), landmarkList.get(7).getX(), landmarkList.get(7).getY());
        float f_3_15 = getDistance(landmarkList.get(3).getX(), landmarkList.get(3).getY(), landmarkList.get(15).getX(), landmarkList.get(15).getY());

//        Log.e(TAG, "f_3_7: " + f_3_7);
//        Log.e(TAG, "f_3_15: " + f_3_15);
//        Log.e(TAG, "fromFirstToSecond: " + fromFirstToSecond);
//        Log.e(TAG, "fromSecondToThird: " + fromSecondToThird);
//        Log.e(TAG, "fromThirdToFourth: " + fromThirdToFourth);

        if(f_3_7<=pointDistLimit
                && fromFirstToSecond<=fingerDistLimit
                && fromSecondToThird<=fingerDistLimit
                && fromThirdToFourth<=fingerDistLimit)
            return "Rock";
        else if(f_3_15>pointDistLimit
                && fromFirstToSecond<=fingerDistLimit
                && fromSecondToThird<=fingerDistLimit
                && fromThirdToFourth<=fingerDistLimit)
            return "Paper";
        else if(f_3_15<=pointDistLimit
                || (fromSecondToThird>fingerDistLimit && fromThirdToFourth<=fingerDistLimit))
            return "Scissors";

        return "None";
    }

    private float getDistance(float x1, float y1, float x2, float y2){
        return (float)Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
    }
}
