package com.iluna;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import com.emekalites.react.alarm.notification.BundleJSONConverter;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONObject;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SplashScreen.show(this);
    }

    @Override
    public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      try {
          Bundle bundle = intent.getExtras();
          if (bundle != null) {
              JSONObject data = BundleJSONConverter.convertToJSON(bundle);
              getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("OnNotificationOpened", data.toString());
          }
      } catch (Exception e) {
          System.err.println("Exception when handling notification opened. " + e);
      }
  }

  @Override
  protected String getMainComponentName() {
    return "iluna";
  }
}
