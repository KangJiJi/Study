# Assets, Metadata, and CSS

## Assets

&nbsp;`Next.js`는 `public/`디렉토리 안에 있는 `Assets`에 접근할 수 있다.

```javascript
// dir is /public/vercel.svg
<img src="/vercel.svg" alt="Vercel Logo" className="logo" />
```

## Metadata

&nbsp;`next/head`모듈의 `Head`컴포넌트를 이용해서 특정 페이지에서의 Header를 이용할 수 있다.

```javascript
import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

위와 같이 `Head`컴포넌트를 import해서 적용하면 `title`이 변한 것을 브라우저에서 확인할 수 있다.

## CSS Styling

&nbsp;`Next.js`에서는 `styled-jsx`라이브러리를 기본적으로 지원한다. 따라서 다음과 같이 사용할 수 있다.

```javascript
export default function Main() {
  return (
    <div className="main">
      <>...</>
      <style jsx>{`
        ...
      `}</style>
    </div>
  );
}
```

`css file`을 따로 `import`하는 것도 가능하다.

```javascript
import styles from "./layout.module.css";
function Layout({ children }) {
  // 자동으로 유일한 className을 생성한다.
  return <div className={styles.container}>{children}</div>;
}
export default Layout;
```

```css
/* layout.module.css */
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

`css reset`과 같이 css를 global하게 적용해야 한다면 `_app.js`파일을 만들어서 global css를 적용시킬 수 있다.

```javascript
// dir is /pages/_app.js
import "../styles/global.css";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

```css
/* dir is /styles/global.css */
* {
  box-sizing: border-box;
}

...
```

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
