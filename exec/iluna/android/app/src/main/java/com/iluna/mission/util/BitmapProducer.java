package com.iluna.mission.util;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.iluna.R;

public class BitmapProducer extends Thread {
    private Bitmap bmp;
    private FrameListener frameListener;
    public static final String TAG = "BitmapProducer";

    public void setFrameListener(Context context, FrameListener frameListener){
        this.frameListener = frameListener;
        this.frameListener.onFrame(BitmapFactory.decodeResource(context.getResources(), R.drawable.init));
        start();
    }

    public void predict(Bitmap bmp){
        this.bmp = Bitmap.createScaledBitmap(bmp, 720, 1280, true);
    }

    @Override
    public void run() {
        while(true){
            if(bmp==null || frameListener == null) continue;

            frameListener.onFrame(bmp);

            if(bmp!=null && frameListener !=null) bmp = null;

            try{
                Thread.sleep(10);
            }catch (Exception e){
                Log.d(TAG, e.toString());
            }
        }
    }

    @Override
    public void interrupt() {
        super.interrupt();
    }
}
