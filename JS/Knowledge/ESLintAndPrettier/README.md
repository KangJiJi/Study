# ESLint와 Prettier

## ESLint는 무엇인가?

&nbsp;Lint혹은 Linter는 소스 코드를 분석해서 소스코드의 오류, 버그, 스타일 오류에 표시를 하는 도구를 가리킨다. 따라서 [ESLint](https://eslint.org/)는 코드의 안티 패턴이나 버그를 찾아낼 수 있는 Javascript Linter다. 변수의 범위, 안티 패턴 등등을 미리 찾아서 런타임 에러를 방지할 수 있다.

## Prettier는 무엇인가?

&nbsp;[Prettier](https://prettier.io/)는 여러 사람이 동일한 코드 포멧을 가질 수 있게 변환해주는 Code Formatter다. 코드의 형식을 맞춘다는 기능은 ESLint와 똑같지만 목적이 다르다.

## VSCode에서 ESLint와 Prettier Extension 다운로드

![eslintAndPrettier](https://user-images.githubusercontent.com/22635168/83540292-0ee49d00-a533-11ea-93bc-cae9f38f22e7.png)

&nbsp;VSCode의 Extension으로 위와 같이 생긴 ESLint와 Prettier를 설치한다.

## 프로젝트 의존성 추가하기

&nbsp;Eslint와 Prettier를 VSCode에서 사용하기 위해서는 패키지를 설치해야한다. 다음 명령어로 기본 ESLint와 Prettier설정을 설치 수 있다. 이때 ESLint와 Prettier는 서로 충돌하는 설정이 있기 때문에 'eslint-plugin-prettier'패키지를 통해 해결할 수 있다.

> npm install --save-dev eslint prettier eslint-plugin-prettier eslint-config-prettier

그리고 ESLint의 기본설정에서 [Airbnb에서 사용하는 설정](https://github.com/airbnb/javascript)을 다운받는다(npm은 여러 사전 의존성을 추가해야 하기 때문에 한번에 해결할 수 있는 npx를 사용한다).

> npx install-peerdeps --dev eslint-config-airbnb

## Prettier의 설정

&nbsp;Pretter는 Code formatter이자 각자의 사용하는 포멧을 설정할 수 있다. 프로젝트 상위 디렉토리에 '.prettier'파일을 만들어서 설정을 추가할 수 있다.

```
{
	"singleQuoate": ture // 작은 따옴표를 사용하는 설정
  ...
}
```

## ESLint의 설정

&nbsp;ESLint 또한 '.eslintrc.json'파일을 통해서 설정을 추가할 수 있다. 기본적인 설정을 사용하고 싶으면 전역으로 다운받은 eslint로 `eslint --init`명령어를 통해 초기화 할 수 있다.

```
{
  // airbnb eslint 규칙 적용
  "extends": ["react-app", "airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    // prettier의 경고를 error로 표시
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }]
  }
}
```

## 자동 변환

&nbsp;파일을 저장할 때마다 설정한 포멧에 맞게 자동으로 변화하려면 VSCode의 설정(Ctrl + ,)에서 `Format on save`기능을 활성화시켜주면 된다.
