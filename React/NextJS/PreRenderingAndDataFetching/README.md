# Pre-rendering and Data Fetching

## Pre-rendering

&nbsp;`Pre-rendering`기능은 `<Link>`컴포넌트 안에 있는 링크의 정보를 백그라운드로 미리 다운 받아 놓는 기능이다. 각각의 생성된 HTML은 그 페이지에 필요한 최소한의 Javascript 코드를 가지고 있다. 그리고 브라우저에 의해 페이지가 로딩되면 Javascript 코드가 완전한 페이지를 만드는데 이 과정을 `Hydration`이라고 한다.

다음은 `pre-rendering`과 `no-pre-rendering`의 차이점이다.
![pre-rendering](https://user-images.githubusercontent.com/22635168/92613258-ba04af80-f2f5-11ea-9ce8-98437389b61d.png)

![no-pre-rendering](https://user-images.githubusercontent.com/22635168/92613260-bb35dc80-f2f5-11ea-8dff-c56ea0ad357e.png)

## Pre-rendering의 두 가지 종류

&nbsp;`Next.js`의 `Pre-rendering`에는 `Static generation`과 `Server-side Rendering` 두 가지 종류가 있다.

- `Static generation`은 빌드 시점에서 HTML을 생성하는 것이다. 각각의 요청에 HTML을 재사용 한다.
- `Server-side Rendering`은 각각의 요청마다 HTML을 생성하는 것이다.

> 개발 모드에서는 `Static generation`을 사용해도 각각의 요청마다 `pre-rendered`된다.

## Static Generation with and without Data

&nbsp;`Next.js`는 `Static Generation`과 `Server-side Rendering` 중 속도가 빠른 전자의 방법을 추천한다. 따라서 데이터가 필요하거나 필요없는 `Static Generation`에 대해서 알아본다.

`Next.js`에서는 `getStaticProps`함수를 이용해서 외부의 데이터를 fetch하고 props로 넘겨줄 수 있다.

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

## getStaticProps Details

- `getStaticProps`함수는 오직 서버에서만 실행이 된다. 따라서 다음과 같은 것들이 가능하다.
  - 서버에 있는 file에 접근
  - 외부 api를 사용
  - 직접 DB에 쿼리 사용
- `getStaticProps`함수의 개발 모드와 배포 했을 때 차이점은 다음과 같다.
  - `getStaticProps`함수가 모든 요청마다 실행
  - `getStaticProps`함수가 빌드 시점에 한번 실행
- `getStaticProps`함수는 page에서만 `export`될 수 있고 page가 아닌 파일에서는 `export`가 불가능하다.

## Fetching Data at Request Time

&nbsp;웹 페이지는 빌드 시점 데이터가 아닌 요청 시점 데이터가 필요할 수 있다. 이런 경우는 `Static generation`대신 `Server-side Rendering`을 사용해야 한다. `Server-side Rendering`를 이용하기 위해서는 `getStaticProps`대신 `getServerSideProps`함수를 `export`하면 된다.

```javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

만약 미리 랜더링 된 데이터가 필요하지 않다면 `Client-Side Rendering`을 고려해봐도 된다. 대쉬보드와 같은 페이지들은 `SEO`와 연관이 없기 때문에 좋은 예시 중 하나다.
