# Commit convention(커밋 컨벤션)

## Commit convention?

&nbsp;Git을 사용하면서 commit을 할 때 정형화된 형식으로 커밋을 하기 위한 약속이다.

## 구성 요소

&nbsp;하나의 커밋 메시지는 다음과 같은 구성요소로 이루어져 있다.

- Type: 커밋의 유형
- Title: 커밋의 제목
- Body: 커밋에 대한 추가 설명

```
[Type] Title

Body
```

### Type

&nbsp;커밋의 유형을 적어주는 부분이다. 커밋 메시지 가장 앞에 적어서 빠르게 어떤 종류의 커밋인지 추측할 수 있다.

- Feature: 새로운 기능 추가
- Refactoring: 코드의 리팩토링
- Test: 테스트 코드 추가 혹은 삭제
- Fix: 버그 수정
- Change: 줄 바꿈, 스페이스, 세미콜론 수정 등등 로직 변경이 없는 경우
- Document: 문서 수정
- Asset: 이미지, 동영상, 음성 파일 추가 혹은 삭제
- Package: 패키지 추가 혹은 삭제
- Build: 빌드 옵션 수정

### Title

&nbsp;커밋의 내용을 간략하게 적는 제목이다. 제목은 50자를 넘기지 말고 명령조로 마침표 없이 작성한다.

### Body

&nbsp;커밋에 대한 추가 설명을 적는 칸이다. Title을 적고 한 행을 띄어서 작성한다. 한 줄에 72자를 넘지 않고, 필수는 아니다.

### Example

```
[Refactoring] A 컴포넌트의 추상화 수준 변경

형제 컴포넌트인 B 컴포넌트와 추상화 수준이 맞지 않아서 같은 추상화 수준을 가지도록 변경했다.
```

```
[Asset] 숫자 이미지 추가
```

```
[Package] A 패키지 삭제 후 B 패키지 추가

A 패키지는 B 패키지와 주간 다운로드 수는 X,XXX,XXX회로 비슷하지만 2년 전부터 업데이트가 없었기 때문에 B 패키지로
변경했다.

```

```
[Test] Lorem ipsum dolor sit amet, consectetur

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve
niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c
ommodo consequat. Duis aute irure dolor in reprehenderit in voluptate v
elit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaec
at cupidatat non proident, sunt in culpa qui officia deserunt mollit an
im id est laborum.
```
