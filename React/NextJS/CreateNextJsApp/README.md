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
