Git Flow(깃 플로우)
==================

## Git Flow?
&nbsp;Git flow는 브랜치 관리 전략(Branch management strategy) 중 하나이다. Git을 통해 프로젝트를 효율적으로 관리, 유지, 배포하기 위한 전략이다.

## 구성 요소
&nbsp;Git flow의 브랜치는 다음 브랜치들로 이루어져 있다.

* master: 언제든지 사용자에게 보여질 수 있는 브랜치
* develop: 다음 버전을 위해 개발하는 브랜치
* feature: 기능을 개발하는 브랜치
* release: 추후에 출시될 버전을 준비하는 브랜치
* hotfix: master(출시 버전)에서 나온 버그를 고치는 브랜치

### Master
&nbsp;`master` 브랜치는 사용자에게 보여지는 혹은 출시될 수 있는 브랜치다. 이때 예상 하지 못한 버그가 발생하면 `hotfix` 브랜치에서 수정을 하게 된다.

### Develop
&nbsp;`develop` 브랜치는 다음 버전을 위해 개발하는 브랜치다. 새로운 기능(feature)를 구현할 때마다 `develop`에서 `feature` 브랜치를 판다. 또한 `develop` 브랜치는 `feature` 브랜치를 merge 해주는 역할만 수행하고, 다른 디자이너, 기획자, QA 등등 여러 사람이 개발의 결과물을 볼 수 있게 개발 서버에 배포를 해준다.

### Feature
&nbsp;`feature` 브랜치는 기능을 개발하는 브랜치다. 말 그대로 모든 것이 기능이며, 완결성이 있는 하나의 작업을 뜻한다. React 개발을 예시로 들면 하나의 component를 개발하면서 html의 layout을 작성하거나, 서버와 통신을 위한 api 통신 로직을 작성하거나 모든 것들을 기능으로 볼 수 있다. 이 기능은 최대한 작게 나눠야 하며, 기능 개발이 완료 되면 브랜치를 삭제해주는 것이 좋다. 만약 버그를 찾으면 Rebase 작업이 힘들기 때문에 새로운 브랜치를 만드는 것이 좋다.

### Release
&nbsp;`release` 브랜치는 제품을 출시하기 직전에 버그를 고치거나 최종적으로 작업을 마무리하는 브랜치다. QA 작업을 이 브랜치에서 작업하고 버그가 발생하면 고치고 `develop` 브랜치에 merge한다. 그리고 최종적으로 완성됐다고 판단되면 `master` 브랜치에 merge한다.

### hotfix
&nbsp;`hotfix` 브랜치에서는 `master` 브랜치에서 발견된 버그를 고치기 위한 브랜치다. 버그를 고치고 다시 `master` 브랜치에 merge를 하고, `develop` 브랜치에도 merge한다.