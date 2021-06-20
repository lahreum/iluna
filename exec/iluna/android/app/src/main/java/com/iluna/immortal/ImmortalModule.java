package com.iluna.immortal;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;
// 2. 브리지-> 비동기식. 결과를 RN 계층에 전달하는 유일한 방법은 콜백을 사용하거나 이벤트를 내보내는 것
public class ImmortalModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "Immortal";   // 모듈 이름
    private static ReactApplicationContext reactContext;

    public ImmortalModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
        this.reactContext.startService(new Intent(this.reactContext, ImmortalService.class));
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, ImmortalService.class));
    }
}