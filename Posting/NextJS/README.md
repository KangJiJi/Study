# Create Next.js App

## Next.js with React

&nbsp;`Next.js`는 다음과 같은 문제를 해결할 수 있는 프레임워크다.

- `Webpack`과 같은 번들러 혹은 `Babel`과 같은 트렌스컴파일러를 사용해야 할 때
- `Code splitting`을 통한 제품 최적화가 필요할 때
- 성능과 `SEO`를 위해서 미리 렌더링 된 페이지를 원할 때
- `SSR`혹은 `CSR`을 원할 때

## Setting

&nbsp;10.13 버전 이상의 Node.js가 필요한다.

> npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"

명령어를 통해서 기본 프로젝트를 만든다. 그리고 프로젝트 디렉토리로 이동 후 실행시킨다.

> cd nextjs-blog && npm run dev

이후 `localhost:3000`에 접속하면 `Next.js`프로젝트의 기본 화면을 볼 수 있다. `pages/index.js`를 고쳐서 프로젝트를 진행한다.

# Navigate Between pages

## Navigation

&nbsp;다음과 같은 것들을 공부한다.

- `file system routing`을 이용한 새 페이지 만들기
- `Link`컴포넌트의 사용법
- `Code splitting`과 `prefetching`을 위한 `built-in`지원

`Next.js`에서 `page`는 `/pages` 디렉토리에서 `export`된 `React`컴포넌트를 의미한다. 파일 이름을 기본으로 라우팅된다. 다음과 같은 예시가 있다.

> `pages/index.js`는 `/`로 라우팅 된다.

> `pages/posts/first-post.js`는 `/posts/first-post`로 라우팅 된다.

따라서 `pages/posts/first-post.js`를 다음과 같이 만들면 `http://localhost:3000/posts/first-post`에서 화면을 볼 수 있다.

```javascript
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

![image](https://user-images.githubusercontent.com/22635168/92399507-5ba8c700-f165-11ea-842e-c3b2729c3cd9.png)

위와 같이 간단하게 `pages` 디렉토리에 파일 혹은 디렉토리를 만들면 `url`이 된다.

## Link component

&nbsp;`Next.js`에서는 `HTML`의 `<a>`태그를 `<Link>`태그로 감싸서 사용한다.

```javascript
import Link from 'next/link';

export default function FirstPost() {
  return (
    <>
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

`<Link>`태그가 `client-side navigation`을 지원해준다. `client-side navigation`은 `JavaScript`로 발생시키는 페이지 전환이며, 브라우저의 기본 페이지 전환보다 빠르다. `<a>`태그를 `<Link>`태그로 감싸서 사용하지 않으면 현재 페이지의 모든 소스가 리로딩 될 것이다.

## Code splitting and prefetching

&nbsp;`Next.js`는 자동적으로 `Code splitting`을 해준다. 이것은 첫 페이지를 렌더링할 때 다른 페이지는 제공되지 않는 다는 것을 의미한다. 그래서 첫 페이지 로딩 속도는 수백수천개의 페이지가 추가돼도 똑같다. 또한 각 페이지는 고립돼 있는 것을 의미한다. 한 페이지가 오류를 발생시켜도 나머지는 잘 동작할 것이다.

`Next.js`의 또 다른 기능 중 하나는 `prefetching`이 있다. `prefetching`은 현재 페이지(viewpoint)에 있는 `<Link>`태그에 연결된 페이지들을 미리 백그라운드로 `fetch`해오는 기능이다. 따라서 사용자가 링크를 클릭했을 때 이미 백그라운드에서 로딩 돼 있는 페이지로 변환된다.

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
import Link from 'next/link';
import Head from 'next/head';

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
import styles from './layout.module.css';
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
import '../styles/global.css';
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

# Dynamic Routes

## Page Path Depends on External Data

&nbsp;`getStaticProps`함수를 이용해 page 랜더링에 필요한 데이터를 fetch했다. `Next.js`는 외부 데이터에 의존하는 페이지를 정적으로 만들 수 있다. 이는 `Dynamic URL`을 `Next.js`에서 사용할 수 있는 것을 의미한다.

## How to Statically Generate Pages with Dynamic Routes

&nbsp;`Dynamic Routes`로 요청된 웹 페이지가 생성되는 과정은 다음과 같다.

- `url/posts/<id>` 요청
- `/pages/posts/[js].js` 파일을 가지고 페이지를 생성
  - React가 페이지를 랜더링
  - `getStaticPaths`가 URL이 될 수 있는 모든 `id`값을 반환
  - `getStaticProps`가 `id`값에 따라 적절한 값을 `fetch`

## Implement getStaticPaths

&nbsp;`getStaticPaths`가 반환하는 값은 다음과 같은 형식이여야 한다.

```json
{ params: { id: ... } }
```

`getStaticPaths`가 반환한 값 중 URL에 매치가 되는 값을 `getStaticProps`의 인자로 넘긴다. 넘어온 `id`값을 이용해서 `Dynamic Routes`기능을 수행한다.

```javascript
// /pages/posts/[id].js

...

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    // Fallback은 paths 페이지가 없을 때 처리방법(404 표시)
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

또한 `getStaticPaths`도 개발모드와 배포했을 때 동작의 차이가 있다.

- 개발모드에서는 매번 요청마다 `getStaticPaths`함수 실행
- 배포했을 때는 빌드 시점에 한번 `getStaticPaths`함수 실행

# API Routes

## Creating API Routes

&nbsp;`pages/api`에 함수를 만들어서 `Next.js`앱의 `API endpoint`를 만들 수 있다. 그리고 `http://localhost:3000/api/hello`에 접속해서 확인할 수 있다.

```javascript
// pages/api/hello.js
export default (req, res) => {
  res.status(200).json({ text: 'Hello' });
};
```

그리고 `getStaticProps`, `getStaticPaths`에서 `API Route`를 사용하면 안된다. 대신에 `Server-Side`코드를 작성해야 한다. 왜냐하면 `getStaticProps`, `getStaticPaths`는 서버에서만 실행되기 때문에 클라이언트에서는 절대 실행되지 않는다. 직접적으로 DB에 접근하는 코드는 괜찮다는 것을 의미하기도 한다.

# Deploying Your Next.js App

- Push to GitHub
- Deploy to Vercel

&nbsp;`npm run build`를 실행하면 `.next`폴더에서 빌드 결과물을 볼 수 있다. 그리고 `npm run start`를 통해서 실행시킬 수 있다.
