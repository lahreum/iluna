package com.iluna.immortal;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
// 3. BroadcastReceiver 만들기 -> 다른 응용 프로그램에서 브로드 캐스트 메시지에 반응하는 구성 요소
// BroadcastReceiver는 장치 재부팅 프로세스가 완료된 후 몇 초 전에 생성 된 서비스를 다시 시작할 수 있음
public class BootUpReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
//        context.startService(new Intent(context, HeartbeatService.class));
        if(intent.getAction() == Intent.ACTION_BOOT_COMPLETED){
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                //log("Starting the service in >=26 Mode from a BroadcastReceiver")
                context.startForegroundService(new Intent(context, ImmortalService.class));
                return;
            }
            //log("Starting the service in < 26 Mode from a BroadcastReceiver")
            context.startService(new Intent(context, ImmortalService.class));
        }
    }
}