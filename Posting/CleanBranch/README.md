# 깨끗한 Branch 유지하기

## 깨끗한 Branch 란?

&nbsp;하나의 프로젝트는 여러 사람이 만들어간다. 프로그래머는 새로운 `branch`를 만들어서 기능을 개발하고 `main branch`에 병합한다. 이런 과정에서 여러 프로그래머가 하나의 파일을 수정하기도 하고 많은 `branch`가 생긴다. 이러한 과정을 진행하다 보면 `main branch`는 더러워지기 마련이다.

![dirty branch](https://user-images.githubusercontent.com/22635168/103508344-2b1f3280-4ea4-11eb-8ee5-b38f526182dd.png)

위 `main branch`는 하나의 `file1`을 Branch `feature_1`, `feature_2`에서 수정하고 병합을 이용해서 충돌을 해결한 경우다. 보다시피 여러 `branch`가 생기고 이해하는데 약간의 시간이 소모된다. 따라서 우리의 목표는 위와 똑같은 작업을 하지만 다음과 같이 깨끗한 Branch를 만드는 것이다.

![clean branch](https://user-images.githubusercontent.com/22635168/103508689-d16b3800-4ea4-11eb-8180-b1233caf675f.png)

## 작업의 흐름

- `main branch`에 `file1`이 존재한다.
- 프로그래머 `A`와 `B`가 각각 `feature_1`, `feature_2` branch를 만들어서 `file1`을 수정한다.
- 작업이 끝난 `A`와 `B`가 `commit`과 `push`를 하고 `Github`에서 `PR`을 만들어서 병합을 요청한다.
- 프로젝트 책임자 `C`는 두 `PR`을 확인하고 `B`의 `PR`를 먼저 `main`에 병합한다.
- `A`의 `PR`은 `B`의 `PR`과 같은 `file1`을 수정했기 때문에 충돌이 일어나서 단순하게 `main`에 병합할 수 없다.

따라서 `A`가 충돌을 해결해야 한다.

## 초기 상태와 브랜치 생성

&nbsp;다음은 프로젝트의 초기 상태다. 비어있는 `file1.txt`만 생성된 상태다.

![01 초기 상태](https://user-images.githubusercontent.com/22635168/103509284-2196ca00-4ea6-11eb-9104-d514742a3177.png)

그리고 프로그래머 `A`와 `B`가 각각 `feature_1`, `feature_2` branch를 만든다.

![02 브랜치 생성](https://user-images.githubusercontent.com/22635168/103509386-5b67d080-4ea6-11eb-86e2-00d426a6accb.png)

## A와 B가 file1 수정 후 commit 그리고 PR

&nbsp;`A`와 `B`가 각각 `feature_1`와 `feature_2` branch에서 두 번 commit 한다.

![03 브랜치1에서 두가지 커밋](https://user-images.githubusercontent.com/22635168/103509766-3a53af80-4ea7-11eb-9bbe-90933ba2238e.png)

![04 브랜치2에서 두가지 커밋](https://user-images.githubusercontent.com/22635168/103509769-3cb60980-4ea7-11eb-86a5-ce5aa8ed0ccb.png)

그리고 각각 `main branch`로 `PR`을 요청한다.

![06 생성된 두가지 pr](https://user-images.githubusercontent.com/22635168/103509940-8b63a380-4ea7-11eb-9b8c-4c5722e10163.png)

## C의 선택

&nbsp;프로젝트 책임자 `C`가 `B`의 `PR`을 병합했다고 가정하자. 그러면 다음과 같이 `A`의 `PR`은 충돌 때문에 병합할 수 없다고 경고창이 뜨게 된다.

![07 gh에서 pr 충돌](https://user-images.githubusercontent.com/22635168/103510153-f7dea280-4ea7-11eb-88cd-de05609fc15f.png)

이때 `A`가 `file1`의 충돌을 해결해서 다시 `Push`를 해야지 `main branch`로 병합할 수 있다. 다음은 현재 상태의 `A`가 보는 `git log`다.

![08 브랜치2의 pr이 머지된 경우](https://user-images.githubusercontent.com/22635168/103510335-602d8400-4ea8-11eb-8973-0ebf87b3dbba.png)

## A의 충돌(Conflict) 해결

&nbsp;이때 `A`가 충돌을 해결할 수 있는 방법이 두 가지가 있다.

- `main branch`를 `feature_1 branch`로 병합해서 충돌 해결하기
- `rebase`를 사용해서 충돌 해결하기

`rebase`를 사용해서 충돌을 해결하는 것이 `branch`를 깨끗하게 유지할 수 있다. 하지만 commit이 많은 경우 복잡해질 수 있다. 하지만 `main branch`를 깨끗하게 유지하는 것이 목표이기 때문에 `rebase`를 이용한다. `rebase`는 말 그대로 `base(기초)`를 변경하는 것이다. 이 또한 병합의 한 종류라 할 수 있다.

## Rebase main

&nbsp;첫 단계로 `feature_1 branch`에서 `rebase`를 실행한다.

```
git rebase main
```

그러면 다음과 같이 충돌이 발생했다는 오류를 확인할 수 있다.

![09 리베이스 첫 단계 컨플릭트](https://user-images.githubusercontent.com/22635168/103511009-90c1ed80-4ea9-11eb-9c2b-0202aa8f1929.png)

`feature_1`에서 고친 `file1`과 `main`에 있는 `file1`의 내용이 다르기 때문에 충돌이 발생했다. `file1`을 열어서 다음과 같은 충돌을 해결한다.

![10 충돌 해결](https://user-images.githubusercontent.com/22635168/103511109-bf3fc880-4ea9-11eb-97ba-4306d096f103.png)

그리고 `git status`를 확인해보면 수정된 `file1`을 확인할 수 있고, `git add`를 통해서 수정된 `file1`을 올린다. 그리고 다시 `git status`를 확인해보면 다음과 같이 `git rebase --continue`를 실행하라는 문구를 볼 수 있다.

![12 add 후](https://user-images.githubusercontent.com/22635168/103511221-ef876700-4ea9-11eb-8934-e02f31f30ad5.png)

이제 다시 `git rebase --continue`를 실행하면 다시 충돌이 발생했다는 오류를 볼 수 있다. 왜냐하면 `feature_1 branch`의 `1번 커밋`의 `base`는 `main branch`로 변했지만, `2번 커밋`의 `base`는 아직 `feature_2 branch`가 병합되기 전 `main branch`이기 때문이다. `2번 커밋`에 대한 충돌도 위와같은 방법으로 해결하면 다음과 같이 `rebase`가 성공했다는 문구를 볼 수 있다.

![16 rebase해결](https://user-images.githubusercontent.com/22635168/103511555-9f5cd480-4eaa-11eb-9d4b-b473feae2016.png)

그리고 `git log`를 살펴보면 다음과 같다.

![17 rebase 직후 로그](https://user-images.githubusercontent.com/22635168/103511700-dfbc5280-4eaa-11eb-808b-33eb7c6f77c8.png)

이때 `rebase`는 기록을 바꾸는 위험한 작업 중 하나다. 따라서 `push`를 해야하는데 `--force`옵션을 붙여서 `push`를 해야 오류 문구가 안나타난다.

```
git push --force origin current_branch_name
```

![18 강제 푸시](https://user-images.githubusercontent.com/22635168/103511961-4c375180-4eab-11eb-8892-b7e4afbdca58.png)

강제 `push` 후 `git log`를 살펴보면 다음과 같다.

![19 강제 푸시 후 로그](https://user-images.githubusercontent.com/22635168/103512023-6709c600-4eab-11eb-8c7b-edee9fe74a85.png)

그리고 `Github`에서 `PR`을 확인하면 다음과 같이 충돌이 없고 병합 할 수 있다고 나오게 된다.

![20 해결된 pr 컨플릭트](https://user-images.githubusercontent.com/22635168/103512135-928cb080-4eab-11eb-8816-dd223e7c2d27.png)

## C의 병합

&nbsp;`A`가 다시 충돌을 해결해서 올린 `PR`을 본 `C`는 `main branch`로 병합을 하게된다. 그러면 다음과 같은 깨끗해진 `branch`를 확인할 수 있다.

![21 깨끗해진 main 브랜치](https://user-images.githubusercontent.com/22635168/103512262-c2d44f00-4eab-11eb-87fb-4b921c04ccf0.png)

하지만 충돌을 해결하는 과정에서 `A`가 `feature_1 branch`에서 `git merge main`을 통해 충돌을 해결하고 `push`를 했다면 다음과 같은 `branch`를 볼 수 있다.

![dirty branch](https://user-images.githubusercontent.com/22635168/103508344-2b1f3280-4ea4-11eb-8ee5-b38f526182dd.png)

확실히 전자의 `git log`가 보기 편한 것을 알 수 있다.

## 요약

- `rebase`를 통해서 충돌을 해결하는 것이 예쁘다.
- local에서 `rebase`실행하고, `git push --force`를 해야한다.
