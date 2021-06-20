package com.iluna.alarm.db;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.iluna.alarm.model.AlarmDao;
import com.iluna.alarm.model.AlarmDto;

@Database(entities={AlarmDto.class},version=1,exportSchema=false)
@TypeConverters({RoomTypeConverter.class})
public abstract class DbTest extends RoomDatabase {
    public abstract AlarmDao alarmDao();
    private static DbTest instance;

    public static DbTest getInstance(Context context){
        if(instance==null){
            instance= Room.databaseBuilder(context.getApplicationContext(),DbTest.class,
                    "iluna.db").build();
        }
        return instance;
    }

}
