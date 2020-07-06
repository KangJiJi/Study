// Make data
class node {
  constructor(data) {
    this.data = data;
    // Left node.
    this.leftNode = null;
    // Right node.
    this.rightNode = null;
  }
}

// BST(Binary Search Tree)
class binarySearchTree {
  constructor() {
    // Number of node in binary tree.
    this.numberOfNode = 0;
    // Top node in binary tree.
    this.rootNode = null;
  }
  // Insert node in binary tree.
  _insertNode(node) {
    if (this.rootNode == null) {
      // Exception handling when rootNode is null.
      this.rootNode = node;
    } else {
      let currentNode = this.rootNode;
      let parentNode;
      while (true) {
        // Find location where node will be inserted.
        parentNode = currentNode;
        if (node.data < currentNode.data) {
          // Exception handling when node.data is less then currentNode.data.
          currentNode = currentNode.leftNode;
          if (currentNode == null) {
            // Exception handling when currentNode is null.
            parentNode.leftNode = node;
            break;
          }
        } else {
          // When currentNode.data is less then node.data.
          currentNode = currentNode.rightNode;
          if (currentNode == null) {
            // Exception handling when currentNode is null.
            parentNode.rightNode = node;
            break;
          }
        }
      }
    }
    // Increase number of node.
    this.numberOfNode++;
  }
  // Remove the node that has specific data and reorder the binary tree.
  _removeNode(data) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      let parentNode = null;
      let currentNode = this.rootNode;
      // Find node.
      while (currentNode.data != data) {
        if (data < currentNode.data) {
          parentNode = currentNode;
          currentNode = currentNode.leftNode;
        } else {
          parentNode = currentNode;
          currentNode = currentNode.rightNode;
        }
        if (currentNode == null) {
          // Returns false when there is no matching data.
          return false;
        }
      }

      // When there is matching data.
      if (currentNode.leftNode == null && currentNode.rightNode == null) {
        // When there is no child.
        if (parentNode == null) {
          // When remove root node.
          this.rootNode = null;
        } else {
          if (parentNode.leftNode.data == data) {
            parentNode.leftNode = null;
          } else {
            parentNode.rightNode = null;
          }
        }
      } else if (
        currentNode.leftNode == null ||
        currentNode.rightNode == null
      ) {
        // When there is no left node or right node.

        if (parentNode == null) {
          // When remove root node.
        } else {
          if (parentNode.leftNode.data == data) {
            parentNode.leftNode = null;
          } else {
            parentNode.rightNode = null;
          }
        }
      } else {
        // When there is left and right node.
        if (parentNode == null) {
          // When remove root node.
        } else {
          if (parentNode.leftNode.data == data) {
            parentNode.leftNode = null;
          } else {
            parentNode.rightNode = null;
          }
        }
      }
    }
    // if(currentNode.data == data) {
    // 	// When currentNode.data and data are same.
    //
    // } else if (currentNode.data > data) {
    // 	// When currentNode.data is bigger than data.
    //
    // } else {
    // 	// When data is bigger than currentNode.data.
    //
    // }
    this.numberOfNode--;
  }
  _findParentNode(data) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      let currentNode = this.rootNode;
      while (currentNode.data != data) {
        if (data < currentNode.data) {
          currentNode = currentNode.leftNode;
        } else {
          currentNode = currentNode.rightNode;
        }
        if (currentNode == null) {
          // Returns false when there is no matching data.
          return false;
        }
      }
      return currentNode;
    }
  }
  // Print all node in tree using preOrder.
  _preOrder(currentNode = this.rootNode) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      if (!(currentNode == null)) {
        console.log(currentNode.data);
        this._preOrder(currentNode.leftNode);
        this._preOrder(currentNode.rightNode);
      }
    }
  }
  // Print all node in tree using inOrder.
  _inOrder(currentNode = this.rootNode) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      if (!(currentNode == null)) {
        this._inOrder(currentNode.leftNode);
        console.log(currentNode.data);
        this._inOrder(currentNode.rightNode);
      }
    }
  }
  // Print all node in tree using postOrder.
  _postOrder(currentNode = this.rootNode) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      if (!(currentNode == null)) {
        this._postOrder(currentNode.leftNode);
        this._postOrder(currentNode.rightNode);
        console.log(currentNode.data);
      }
    }
  }
  //Find the node that has the specific data through the level order.
  _findNode(data) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      let currentNode = this.rootNode;
      while (currentNode.data != data) {
        if (data < currentNode.data) {
          currentNode = currentNode.leftNode;
        } else {
          currentNode = currentNode.rightNode;
        }
        if (currentNode == null) {
          // Returns null when there is no matching data.
          return false;
        }
      }
      return currentNode;
    }
  }
  // Return minimum data in tree.
  _getMin() {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      let currentNode = this.rootNode;
      while (!(currentNode.leftNode == null)) {
        currentNode = currentNode.leftNode;
      }
      return currentNode;
    }
  }
  // Return maximum data in tree.
  _getMax() {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero.
      return false;
    } else {
      let currentNode = this.rootNode;
      while (!(currentNode.rightNode == null)) {
        currentNode = currentNode.rightNode;
      }
      return currentNode;
    }
  }
}

// Make BST.
let jsBinarySearchTree = new binarySearchTree();
// Make node.
const node_8 = new node(8);
const node_2 = new node(2);
const node_9 = new node(9);
const node_10 = new node(10);
const node_4 = new node(4);
const node_1 = new node(1);
const node_6 = new node(6);
const node_3 = new node(3);
const node_7 = new node(7);
const node_5 = new node(5);

// Add node to BST.
jsBinarySearchTree._insertNode(node_1);
jsBinarySearchTree._insertNode(node_2);
jsBinarySearchTree._insertNode(node_3);
jsBinarySearchTree._insertNode(node_4);
jsBinarySearchTree._insertNode(node_5);
jsBinarySearchTree._insertNode(node_6);
jsBinarySearchTree._insertNode(node_7);
jsBinarySearchTree._insertNode(node_8);
jsBinarySearchTree._insertNode(node_9);
jsBinarySearchTree._insertNode(node_10);

jsBinarySearchTree._inOrder(); // 1 2 3 4 5 6 7 8 9 10
console.log("MAXIMUM: " + jsBinarySearchTree._getMax().data); // 10
console.log("MINIMUM: " + jsBinarySearchTree._getMin().data); // 1
console.log("Find node: " + jsBinarySearchTree._findNode(5).data); // 5

jsBinarySearchTree._removeNode(1);
