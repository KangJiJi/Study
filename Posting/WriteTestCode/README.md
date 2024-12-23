# 테스트 가능한 코드 만들기

## 테스트 코드

&nbsp;왜 테스트 코드를 작성해야할 까?

1. 버그를 사전에 방지하고, 발견하기 쉽게 함
2. 코드의 품질 향상(잘 모듈화)
3. 리팩토링 및 유지보수 용이성
4. 문서화 역할
5. 팀 협업 효율성
6. 자동화된 배포 및 CI/CD 지원
7. 신뢰성 증가
8. 성능 측정 및 최적화

## 테스트 코드는 만능인가?

&nbsp;위와 같은 엄청난 장점들이 있는데, 그러면 테스트 코드는 만능인가? 당연히 테스트 코드에도 많은 단점들이 있다.

1. 초기 개발 비용과 시간 소모
2. 유지보수 비용
3. 테스트 코드의 품질 문제
4. 테스트의 실행 시간
5. 잘못된 테스트의 위험
6. 테스트 코드의 의존성 관리
7. 테스트 코드의 가짜 동작 (Mocking 만 하면, 실제 동작과 다를 수 있음)
8. 테스트 코드의 과도한 신뢰
9. 테스트 커버리지와 실용성의 균형 문제

언제나 정답은 없고, 지양점과 지향점만 있을 뿐.

## 어떤것들이 테스트 하고, 하지말아야할까?

&nbsp;테스트 코드에도 장단점이 있다. 그럼에도 테스트 코드를 작성하는 것이 프로그램을 유지보수 하는데 긍정적인 영향을 미치고, 이는 조직이 좋은 아웃풋을 가져올 것이라 생각한다. 그러면, 어떤 것을 테스트 해야하고 하지말아야할까?

### 테스트 하기 어려운 것

1. 외부 시스템과의 의존성(api, DB, fs 등등)
2. 비동기 코드
3. 의존성이 강한 코드(무조건 적으로 A 라는 작업이 완료되어야 B 를 테스트 할 수 있음)
4. 상태 변경
5. UI 및 렌더링
6. 비즈니스 로직의 복잡성
7. 멀티스레딩 / 병렬 처리
8. 보안 관련 코드
9. 하드코딩된 값
10. 라이브러리/프레임워크에 의존적인 코드

### 테스트 해야할 것

1. 비즈니스 로직
2. 테스트 하기 어려운 것 외 대부분의 것들

## 실제 웹 서버를 만들어보자

