# Facade(퍼사드)

## 의도

&nbsp;한 서브시스템 내의 인터페이스 집합에 대한 획일화된 하나의 인터페이스를 제공하는 패턴으로, 서브시스템을 사용하기 쉽도록 상위 수준의 인터페이스를 정의합니다.

## 동기

&nbsp;시스템을 서브 시스템으로 구조화하면 복잡성을 줄이는 데에 큰 도움이 된다. 이렇게 복잡성도 줄이면서 단순화된 하나의 인터페이스를 제공하는 것이 퍼사드 패턴이다. 컴파일러 시스템을 예로 들면 우리는 컴파일러 사용의 명령어만을 이용할 뿐, 어떤 과정을 이용해서 동작하는지 알 필요가 없다. 이때 `Compiler` 클래스를 퍼사드 객체로 정의할 수 있다. 필수적인 인터페이스만 제공하고, 클래스들을 함께 동작하도록 묶어주는 역할을 수행한다.

## 활용성

- 복잡한 서브시스템에 대한 단순한 인터페이스 제공이 필요할 때
- 추상 개념에 대한 구현 클래스와 사용자 사이에 너무 많은 종속성이 존재할 때
- 서브시스템을 계층화시킬 때

## 참여자

- 퍼사드
- 서브시스템 클래스들

## 협력 방법

&nbsp;퍼사드에 정의된 인터페이스를 이용해서 서브시스템과 상호작용한다. 이때 퍼사드는 서브시스템의 적절한 객체에 전달하는 역할을 한다.

## 결과

- 서브시스템의 구성요소를 보호할 수 있다.
- 서브시스템과 사용자 코드 간의 결합도를 더욱 약하게 만든다.
- 응용프로그램 쪽에서 서브시스템 클래스를 사용하는 것을 완전히 막지는 않습니다.

## 구현

- 사용자와 서브시스템 간의 결합도 줄이기(퍼사드를 추상 클래스로 정의)
- 서브시스템 클래스 중 공개할 것과 감출 것

## 예제 코드

&nbsp;컴파일러 시스템에서 퍼사드 패턴의 예시다. 기계 명령어를 명시하는 `Bytecode`객체의 스트림을 처리하는 `BytecodeStream`클래스를 정의한다. 또한 `Token`클래스를 정의하여 프로그래밍 언어가 정의한 토큰을 캡슐화한다. `Scanner` 클래스는 문자 스트림을 받아서 토큰을 만들어 낸다.

```javascript
class Scanner {
  constructor(istream) {}

  scan() {}
}
```

`Parser`는 `ProgramNodeBuilder`를 사용하여 `Scanner` 토큰에서 파스 트리를 만든다.

```javascript
class Parser {
  constructor(scanner, programNodeBuilder) {}
}
```

이때 `ProgramNodeBuilder`는 다음과 같다.

```javascript
class ProgramNodeBuilder {
  newVariable() {}
  newAssignment() {}
  newReturnStatement() {}
  newCondition() {}
  getRootNode() {}
}
```

그리고 파스 트리는 `ProgramNode`클래스를 상속받는 서브클래스들의 인스턴스로 되어 있다.

```javascript
class ProgramNode {
  getSourcePosition(line, index) {}
  add(programNode) {}
  remove(programNode) {}
  traverse(codeGenerator) {}
}
```

`programNode`들이 `CodeGenerator`를 이용해서 `byteCodeStream`에 정의된 `byteCode`ㄱ개체의 형식으로 기계 코드를 만들어낸다. `CodeGenerator`는 방문자에 해당한다.

```javascript
class CodeGenerator {
  visite(statementNode) {}
}
```

이제 위 객체들로 복합되는 컴파일러 서브시스템을 살펴본다. `Compiler`클래스는 퍼사드다.

```javascript
class Compiler {
  compile(input, output) {
    const scanner = new Scanner(input);
    const builder = new ProgramNodeBuilder();
    const parser = new Parser();

    parser.Parser(scanner, builder);

    const parseTree = builder.getRootNode();
    parseTree.traverse(generator);
  }
}
```

## 관련 패턴

&nbsp;추상 팩토리 패턴은 서브시스템 객체를 생성하는 인터페이스를 제공할 수 있다. 중재자 패턴은 퍼사드 패턴과 유사하다. 만약 퍼사드 객체가 하나만 있어도 된다면, 단일체 패턴을 사용한다.
