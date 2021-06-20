package com.iluna.alarm.model;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;


@Dao
public interface AlarmDao {

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    public long insert(AlarmDto dto);

    @Query("select * from alarm order by alarm_time")
    public AlarmDto[] findAll();

    @Update
    public int updateAlarm(AlarmDto dto);

    @Delete
    public int deleteAlarm(AlarmDto dto);

    @Query("select * from alarm where alarm_id = :alarmId")
    public AlarmDto findById(int alarmId);

    @Query("select * from alarm where noti_id = :notiId")
    public AlarmDto findByNotiId(int notiId);
}
