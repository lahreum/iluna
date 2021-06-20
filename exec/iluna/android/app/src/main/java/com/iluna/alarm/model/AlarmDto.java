package com.iluna.alarm.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.sql.Time;

@Entity(tableName="alarm")
public class AlarmDto {
    @NonNull
    @PrimaryKey(autoGenerate = false)
    @ColumnInfo(name="alarm_id")
    private int alarmId;

    @NonNull
    @ColumnInfo(name="noti_id")
    private int notiId;

    @NonNull
    @ColumnInfo(name="alarm_time")
    private Time alarmTime;

    @NonNull
    @ColumnInfo(name="alarm_name")
    private String alarmName;

    @NonNull
    @ColumnInfo(name="alarm_repeat")
    private int alarmRepeat;

    @ColumnInfo(name="alarm_bell")
    private String alarmBell;

    @NonNull
    @ColumnInfo(name="alarm_is_vibe",defaultValue = "1")
    private boolean alarmIsVibe;

    @NonNull
    @ColumnInfo(name="alarm_is_active",defaultValue = "1")
    private boolean alarmIsActive;

    @NonNull
    @ColumnInfo(name="alarm_math",defaultValue = "2")
    private int alarmMath;

    @NonNull
    @ColumnInfo(name="alarm_card",defaultValue = "2")
    private int alarmCard;

    @NonNull
    @ColumnInfo(name="alarm_picture",defaultValue = "1")
    private boolean alarmPicture;

    @NonNull
    @ColumnInfo(name="alarm_rps",defaultValue = "1")
    private boolean alarmRps;

    @NonNull
    @ColumnInfo(name="alarm_interval",defaultValue = "0")
    private int alarmInterval;

    @NonNull
    @ColumnInfo(name="alarm_day",defaultValue = "0")
    private int alarmDay;

    public int getNotiId() {
        return notiId;
    }

    public void setNotiId(int notiId) {
        this.notiId = notiId;
    }

    public int getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(int alarmId) {
        this.alarmId = alarmId;
    }

    @NonNull
    public Time getAlarmTime() {
        return alarmTime;
    }

    public void setAlarmTime(@NonNull Time alarmTime) {
        this.alarmTime = alarmTime;
    }

    @NonNull
    public String getAlarmName() {
        return alarmName;
    }

    public void setAlarmName(@NonNull String alarmName) {
        this.alarmName = alarmName;
    }

    public int getAlarmRepeat() {
        return alarmRepeat;
    }

    public void setAlarmRepeat(int alarmRepeat) {
        this.alarmRepeat = alarmRepeat;
    }

    public String getAlarmBell() {
        return alarmBell;
    }

    public void setAlarmBell(String alarmBell) {
        this.alarmBell = alarmBell;
    }

    public boolean isAlarmIsVibe() {
        return alarmIsVibe;
    }

    public void setAlarmIsVibe(boolean alarmIsVibe) {
        this.alarmIsVibe = alarmIsVibe;
    }

    public boolean isAlarmIsActive() {
        return alarmIsActive;
    }

    public void setAlarmIsActive(boolean alarmIsActive) {
        this.alarmIsActive = alarmIsActive;
    }

    public int getAlarmMath() {
        return alarmMath;
    }

    public void setAlarmMath(int alarmMath) {
        this.alarmMath = alarmMath;
    }

    public int getAlarmCard() {
        return alarmCard;
    }

    public void setAlarmCard(int alarmCard) {
        this.alarmCard = alarmCard;
    }

    public boolean isAlarmPicture() {
        return alarmPicture;
    }

    public void setAlarmPicture(boolean alarmPicture) {
        this.alarmPicture = alarmPicture;
    }

    public boolean isAlarmRps() {
        return alarmRps;
    }

    public void setAlarmRps(boolean alarmRps) {
        this.alarmRps = alarmRps;
    }

    public int getAlarmInterval() {
        return alarmInterval;
    }

    public void setAlarmInterval(int alarmInterval) {
        this.alarmInterval = alarmInterval;
    }

    public int getAlarmDay() {
        return alarmDay;
    }

    public void setAlarmDay(int alarmDay) {
        this.alarmDay = alarmDay;
    }

    @Override
    public String toString() {
        return "AlarmDto{" +
                "notiId=" + notiId +
                "alarmId=" + alarmId +
                ", alarmTime=" + alarmTime +
                ", alarmName='" + alarmName + '\'' +
                ", alarmRepeat=" + alarmRepeat +
                ", alarmBell='" + alarmBell + '\'' +
                ", alarmIsVibe=" + alarmIsVibe +
                ", alarmIsActive=" + alarmIsActive +
                ", alarmMath=" + alarmMath +
                ", alarmCard=" + alarmCard +
                ", alarmPicture=" + alarmPicture +
                ", alarmRps=" + alarmRps +
                ", alarmInterval=" + alarmInterval +
                ", alarmDay=" + alarmDay +
                '}';
    }
}
