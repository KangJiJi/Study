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
import Link from "next/link";

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
