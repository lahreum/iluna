package com.iluna.alarm.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.ReadableMap;

import java.text.SimpleDateFormat;
import java.text.DateFormat;

import java.sql.Time;

import com.iluna.alarm.model.AlarmDto;
import com.iluna.alarm.db.DbTest;

public class CustomCrudModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  static AlarmDto aDto=null;
  static AlarmDto[] aDtos=null;
  static int aInt=0;

  CustomCrudModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "MyCrudModule";
  }

  @ReactMethod
  public void addAlarm(ReadableMap rm,Callback success,Callback fail){
    Runnable r=new Runnable() {
      @Override
      public void run() {
        // AlarmDto dto=new AlarmDto();
        AlarmDto inputDto=toAlarmDtoObject(rm);
        // dto.setAlarmBell(inputDto.getAlarmBell());
        // dto.setAlarmName(inputDto.getAlarmName());
        // dto.setAlarmTime(inputDto.getAlarmTime());
        // dto.setAlarmRepeat(inputDto.getAlarmRepeat());
        // System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@222" + inputDto.getAlarmTime());

        DbTest dbtest=DbTest.getInstance(getReactApplicationContext());
        long insertedId=dbtest.alarmDao().insert(inputDto);

        aDto=null;
        aDto=dbtest.alarmDao().findById((int)insertedId);
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();
      if(aDto!=null)
        success.invoke("success to add alarm");
      else
        fail.invoke("fail to add alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to add alarm");
    }finally{
      aDto=null;
    }
  }

  @ReactMethod
  public void showAll(Callback success,Callback fail){
    Runnable r=new Runnable() {
      @Override
      public void run() {
        DbTest dbtest= DbTest.getInstance(getReactApplicationContext());
        aDtos=dbtest.alarmDao().findAll();
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();
      success.invoke(toWritableArray(aDtos));
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to load alarms");
    }finally{
      aDtos=null;
    }
  }

  @ReactMethod
  public void showDetail(int id,Callback success,Callback fail){
    Runnable r=new Runnable() {
      @Override
      public void run() {
        DbTest dbtest= DbTest.getInstance(getReactApplicationContext());
        aDto=dbtest.alarmDao().findById(id);
        System.out.println("187tyruiqfiwthurjfrigj@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println(aDto.getAlarmTime());
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();

      if(aDto!=null)
        success.invoke(toWritableMap(aDto));
      else
        fail.invoke("fail to load alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to load alarm detail");
    }finally{
      aDto=null;
    }
  }

  @ReactMethod
  public void showDetailByNotiId(int id,Callback success,Callback fail){
    Runnable r=new Runnable() {
      @Override
      public void run() {
        DbTest dbtest= DbTest.getInstance(getReactApplicationContext());
        aDto=dbtest.alarmDao().findByNotiId(id);
        System.out.println("187tyruiqfiwthurjfrigj@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println(aDto.getAlarmTime());
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();
      if(aDto!=null)
        success.invoke(toWritableMap(aDto));
      else
        fail.invoke("fail to load alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to load alarm detail");
    }finally{
      aDto=null;
    }
  }

  @ReactMethod
  public void updateAlarm(int id,ReadableMap rm,Callback success,Callback fail){
    Runnable r=new Runnable(){
      @Override
      public void run(){
        DbTest dbtest=DbTest.getInstance(getReactApplicationContext());
        AlarmDto dto=dbtest.alarmDao().findById(id);
        if(dto!=null){
          AlarmDto inputDto=toAlarmDtoObject(rm);
          dto.setAlarmId(inputDto.getAlarmId());
          dto.setNotiId(inputDto.getNotiId());
          dto.setAlarmBell(inputDto.getAlarmBell());
          dto.setAlarmCard(inputDto.getAlarmCard());
          dto.setAlarmIsActive(inputDto.isAlarmIsActive());
          dto.setAlarmIsVibe(inputDto.isAlarmIsVibe());
          dto.setAlarmMath(inputDto.getAlarmMath());
          dto.setAlarmInterval(inputDto.getAlarmInterval());
          dto.setAlarmDay(inputDto.getAlarmDay());
          dto.setAlarmName(inputDto.getAlarmName());
          dto.setAlarmPicture(inputDto.isAlarmPicture());
          dto.setAlarmRps(inputDto.isAlarmRps());
          dto.setAlarmRepeat(inputDto.getAlarmRepeat());
          dto.setAlarmTime(inputDto.getAlarmTime());
          aInt=dbtest.alarmDao().updateAlarm(dto);
          System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
          System.out.println(inputDto.isAlarmPicture());
          System.out.println(inputDto.isAlarmRps());
        }
        else
          aInt=0;
        System.out.println(aInt+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();
      if(aInt!=0)
        success.invoke("success to update alarm");
      else
        fail.invoke("fail to update alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to update alarm");
    }finally{
      aInt=0;
    }
  }

  @ReactMethod
  public void deleteAlarm(int id,Callback success,Callback fail){
    Runnable r=new Runnable(){
      @Override
      public void run(){
        DbTest dbtest=DbTest.getInstance(getReactApplicationContext());
        AlarmDto dto=dbtest.alarmDao().findById(id);
        if(dto!=null)
          aInt=dbtest.alarmDao().deleteAlarm(dto);
        else
          aInt=0;
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();
      if(aInt!=0)
        success.invoke("success to delete alarm");
      else
        fail.invoke("fail to delete alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to delete alarm");
    }finally{
      aInt=0;
    }
  }

  @ReactMethod
  public void deleteAll(){
    Runnable r=new Runnable() {
      @Override
      public void run() {
        DbTest dbtest= DbTest.getInstance(getReactApplicationContext());

        AlarmDto[] dtos=dbtest.alarmDao().findAll();

        for(AlarmDto dto:dtos)
          dbtest.alarmDao().deleteAlarm(dto);
      }
    };

    Thread thread=new Thread(r);
    thread.start();
    try{
      thread.join();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  //=======================================================
  WritableMap toWritableMap(AlarmDto dto){
    DateFormat format=new SimpleDateFormat("HH:mm:ss");

    WritableMap wm=new WritableNativeMap();
    wm.putString("alarm_id",Integer.toString(dto.getAlarmId()));
    wm.putString("noti_id",Integer.toString(dto.getNotiId()));
    wm.putString("alarm_time",format.format(dto.getAlarmTime().getTime()));
    wm.putString("alarm_name",dto.getAlarmName());
    wm.putString("alarm_repeat",Integer.toString(dto.getAlarmRepeat()));
    wm.putString("alarm_bell",dto.getAlarmBell());
    wm.putString("alarm_is_vibe",Boolean.toString(dto.isAlarmIsVibe()));
    wm.putString("alarm_is_active",Boolean.toString(dto.isAlarmIsActive()));
    wm.putString("alarm_math",Integer.toString(dto.getAlarmMath()));
    wm.putString("alarm_card",Integer.toString(dto.getAlarmCard()));
    wm.putString("alarm_picture",Boolean.toString(dto.isAlarmPicture()));
    wm.putString("alarm_rps",Boolean.toString(dto.isAlarmRps()));
    wm.putString("alarm_interval",Integer.toString(dto.getAlarmInterval()));
    wm.putString("alarm_day",Integer.toString(dto.getAlarmDay()));

    return wm;
  }

  WritableArray toWritableArray(AlarmDto[] dtos){
    WritableArray wa=new WritableNativeArray();
    for(AlarmDto dto:dtos)
      wa.pushMap(toWritableMap(dto));

    return wa;
  }

  AlarmDto toAlarmDtoObject(ReadableMap rm){
    AlarmDto dto=new AlarmDto();
    dto.setAlarmId(Integer.parseInt(rm.getString("alarm_id")));
    dto.setNotiId(Integer.parseInt(rm.getString("noti_id")));
    dto.setAlarmBell(rm.getString("alarm_bell"));
    dto.setAlarmName(rm.getString("alarm_name"));
    dto.setAlarmTime(Time.valueOf(rm.getString("alarm_time")));
    dto.setAlarmRepeat(Integer.parseInt(rm.getString("alarm_repeat")));
    dto.setAlarmCard(Integer.parseInt(rm.getString("alarm_card")));
    dto.setAlarmMath(Integer.parseInt(rm.getString("alarm_math")));
    dto.setAlarmInterval(Integer.parseInt(rm.getString("alarm_interval")));
    dto.setAlarmDay(Integer.parseInt(rm.getString("alarm_day")));

    if(rm.getString("alarm_is_active").equals("true"))
      dto.setAlarmIsActive(true);
    else
      dto.setAlarmIsActive(false);

    if(rm.getString("alarm_is_vibe").equals("true"))
      dto.setAlarmIsVibe(true);
    else
      dto.setAlarmIsVibe(false);

    if(rm.getString("alarm_picture").equals("true"))
      dto.setAlarmPicture(true);
    else
      dto.setAlarmPicture(false);

    if(rm.getString("alarm_rps").equals("true"))
      dto.setAlarmRps(true);
    else
      dto.setAlarmRps(false);

    return dto;
  }
}