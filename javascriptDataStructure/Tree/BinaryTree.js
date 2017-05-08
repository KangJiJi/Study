// Make data
function node(data) {
	this.data = data;
	this.leftNode = null; // Left node.
	this.rightNode = null; // Right node.
}
/**
*
*
*/
function binaryTree() {
	// Number of node in binary tree.
	this.numberOfNode = 0;
	// Layer of binary tree.
	this.levelOfBinaryTree = 0;
	// Top node in binary tree.
	this.rootNode = null;
	// Insert node in binary tree.
	this.insert = (node) => {
		if (this.rootNode == null) {
			// Exception handling when rootNode is null.
			this.rootNode = node;
		} else {
			//Find the node that has null.
			var currentNode = this.find(null);
			if (currentNode.leftNode == null) {
				currentNode.leftNode = node;
			} else {
				currentNode.rightNode = node;
			}
		}
		this.numberOfNode++;
	}
	// Remove the node that has specific data and reorder the binary tree.
	this.remove = (data) => {
		if(this.rootNode == null){
			// Exception handling when rootNode is null.
			return false;
		} else {
			this.numberOfNode--;
		}
	}
	// Print all node in binary tree.
	this.printBinaryTree = () => {
		var queue = new Array();
		queue.push(this.rootNode);
		while(true) {
			for(var i = 0; i < queue.length; i++) {
				var tempNode = queue.shift();
				console.log(tempNode.data + "	");
				if(tempNode.rightNode == null || (tempNode.leftNode == null && tempNode.rightNode == null)) {
					break;
				} else {
					queue.push(tempNode.leftNode);
					queue.push(tempNode.rightNode);
				}
			}
			console.log("\n");
		}
	}
	//Find the node that has the specific data through the level order.
	this.find = (data) => {
		var queue = new Array();
		queue.push(this.rootNode);
		while (true) {
			for (var i = 0; i < queue.length; i++) {
				var tempNode = queue.shift();
				if (tempNode.leftNode == data || tempNode.rightNode == data) {
					return tempNode;
				} else {
					queue.push(tempNode.leftNode);
					queue.push(tempNode.rightNode);
				}
			}
		}
	}
}
