package com.iluna.immortal;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// 브리지는 RN 계층과 네이티브 계층 간의 통신 수단
// 1. 브리지 생성을 위해서 먼저, 모듈 또는 UI 모듈을 RN 계층에 등록할 패키지를 제공해야함
public class ImmortalPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {       // 반응 컨텍스트를 매개 변수로 전달하는 모듈을 인스턴스화
        return Arrays.<NativeModule>asList(
                new ImmortalModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}