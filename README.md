# Iluna

## 실행 방법
### 1. 파일 다운로드
`$ git clone https://lab.ssafy.com/s04-final/s04p31b103.git`

### 2. PC와 안드로이드 스마트폰 연결

### 3. APK 파일 이동
(1) 스마트폰 저장소 파일로 이동

(2) 새 폴더 생성

(3) 생성한 폴더에 iluna.apk 파일 이동

### 4. 앱 설치
(1) 내 파일 - 내장 메모리 - 새 폴더 - iluna.apk 클릭

(2) 설치 진행

### 5. Iluna 실행

## 기획 의도
알람이 작동되면 바로 종료할 수 있는 기존 알람 앱과는 다르게 미션 기반의 알람 서비스를 제공하여 아침 기상 시 확실하게 잠을 깰 수 있도록 하는데에 목적이 있다.

## 주요 기능
### 1. 알람: 여러 개의 알람을 생성하고 관리할 수 있다.
![alarm](img/알람생성.gif)

### 2. 미션: 알람이 작동하면 랜덤 미션이 시작되고 조건을 달성해야만 알람이 종료된다.
#### (1) 사진 찍기

![mission_1](img/랜덤사물찍기미션.gif)
#### (2) 가위바위보

![mission_2](img/가위바위보.gif)
#### (3) 수학 문제

![mission_3](img/수학문제미션.gif)
#### (4) 카드 게임

![mission_4](img/카드미션.gif)

## 개발 일정
![plan](deliverables/imgs/개발일정.png)


## 역할
#### App: 이하연, 박봉현, 이아름
#### AI: 임찬규

## 코드 컨벤션
### Java
#### [Naming Rules]
- Class는 Pascal 표기법
ex) MainController.java, UserDto.java
- Method, Variable은 Camel 표기법
ex) public void setUserName();
ex) private String userId();
- Method는 동사+명사 형태
ex) getUserId();
ex) selectAll();

#### [Statement Rules]
- if 문을 쓸 때 1줄인 경우 같은 라인에다가, 1줄 이상일 때는 예시처럼 사용

```java
if (true) statement1;

if (true) {
    statement1;
    statement2;
}
```

### Python
#### [Naming Rules]
- Variable, function 은 snake 표기법
- function은 동사+명사 형태

### JavaScript
- Prettier - Code formatter

## 커밋 컨벤션
### Git
- Master branch는 건들지 않는다.
- Develop branch를 복사하여 자신의 branch를 생성한 후 작업한다.
    ex) feature/front/user-hana, feature/back/user-chanchan
- 자신이 담당하는 issue 완료 시 Develop branch에 갱신한다.
- 적어도 issue 하나마다 커밋한다.

```
Commit Message : 

[Jira 이슈 번호] 타이틀: 설명
예시 : [S04P12B207-15]Docs: 커밋 메세지 규칙 수정

Feat : 코드나 테스트를 추가했을 때 + 라이브러리 추가하는 경우
Fix : 버그를 수정했을 때
Remove : 코드를 제거했을 때
Update : 코드를 수정하는 경우
Docs : 문서를 수정했을 때
Style : 코드 포맷팅에 대한 부분 변경, CSS 등
Rename : 이름을 변경했을 때
Move : 코드를 이동할 때
Refac : 기능 변화 없이 코드 내부 구조 변경하는 경우
```

## 주요 기술 스택/도구

| 분류     | 기술 스택/도구 | 비고                    |
| -------- | -------------- | ----------------------- |
| 언어     | Java           |                         |
|          | Python         |                         |
| 앱       | Android        | Android 9.0 (Pie)       |
|          | React Native   | 페이지 제작             |
| 딥러닝   | Tensorflow     | 딥러닝 프레임워크       |
|          | Keras          | 딥러닝 프레임워크       |
