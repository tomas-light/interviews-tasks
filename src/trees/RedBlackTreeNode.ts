export class RedBlackTreeNode {
  value: number;
  color: 'red' | 'black';
  parent: RedBlackTreeNode | null;
  leftChild: RedBlackTreeNode | null;
  rightChild: RedBlackTreeNode | null;
  constructor(value: number, color: RedBlackTreeNode['color'] = 'red') {
    this.value = value;
    this.color = color;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }
  setParent(parent: RedBlackTreeNode | null): RedBlackTreeNode {
    this.parent = parent;
    return this;
  }

  private findRootNode(): RedBlackTreeNode {
    let rootNode: RedBlackTreeNode = this;
    while (rootNode.parent) {
      rootNode = rootNode.parent;
    }
    return rootNode;
  }

  addValueToTree(value: number): RedBlackTreeNode {
    let node = this.findRootNode();
    while (true) {
      if (!node) {
        break;
      }

      if (value >= node.value) {
        if (!node.rightChild) {
          node = node.rightChild = new RedBlackTreeNode(value).setParent(node);
          break;
        } else {
          node = node.rightChild;
        }
      } else {
        if (!node.leftChild) {
          node = node.leftChild = new RedBlackTreeNode(value).setParent(node);
          break;
        } else {
          node = node.leftChild;
        }
      }
    }

    if (node) {
      node.revalidateTreeForNode();
    }

    return this.findRootNode();
  }

  private isRoot() {
    this.setParent(null);
  }

  private revalidateTreeForNode() {
    const { parent } = this;
    if (!parent || parent.color === 'black') {
      return;
    }

    const grandParent = parent.parent;
    if (!grandParent) {
      return;
    }

    let uncle = grandParent.leftChild;
    if (uncle === parent) {
      uncle = grandParent.rightChild;
    }

    if (!uncle || uncle.color === 'black') {
      // rotate and recolor

      if (this.isLeftTriangle()) {
        this.rotateTriangleToLeft();
      } else if (this.isRightTriangle()) {
        this.rotateTriangleToRight();
      } else if (parent.rightChild === this) {
        this.rotateLaneToLeft();
      } else {
        this.rotateLaneToRight();
      }
      return;
    }

    // red uncle
    uncle.color = 'black';
    parent.color = 'black';

    const rootNode = this.findRootNode();
    if (grandParent !== rootNode) {
      grandParent.color = 'red';
      grandParent.revalidateTreeForNode();
    }
  }

  private isLeftTriangle() {
    if (!this.parent) {
      return false;
    }

    const grandParent = this.parent.parent;
    if (!grandParent) {
      return false;
    }

    return grandParent.leftChild === this.parent && this.parent.rightChild === this;
  }

  private isRightTriangle() {
    if (!this.parent) {
      return false;
    }

    const grandParent = this.parent.parent;
    if (!grandParent) {
      return false;
    }

    return grandParent.rightChild === this.parent && this.parent.leftChild === this;
  }

  private rotateTriangleToLeft() {
    const { parent } = this;
    if (!parent) {
      return;
    }

    const grandParent = parent.parent;
    if (!grandParent) {
      return;
    }

    parent.rightChild = this.leftChild?.setParent(parent) ?? null;
    this.leftChild = parent.setParent(this);
    grandParent.leftChild = this.setParent(grandParent);

    parent.rotateLaneToRight();
  }

  private rotateTriangleToRight() {
    const { parent } = this;
    if (!parent) {
      return;
    }

    const grandParent = parent.parent;
    if (!grandParent) {
      return;
    }

    parent.leftChild = this.rightChild?.setParent(parent) ?? null;
    this.rightChild = parent.setParent(this);
    grandParent.rightChild = this.setParent(grandParent);

    parent.rotateLaneToLeft();
  }

  private rotateLaneToLeft() {
    const { parent } = this;
    if (!parent) {
      return;
    }

    const grandParent = parent.parent;
    if (!grandParent) {
      return;
    }

    const rootNode = this.findRootNode();
    const grandGrandParent = grandParent?.parent;

    grandParent.rightChild = parent.leftChild?.setParent(grandParent) ?? null;

    parent.leftChild = grandParent.setParent(parent);
    [parent.color, grandParent.color] = [grandParent.color, parent.color];

    if (rootNode === grandParent) {
      parent.isRoot();
    } else if (grandGrandParent) {
      if (grandGrandParent.leftChild === grandParent) {
        grandGrandParent.leftChild = parent.setParent(grandGrandParent);
      } else {
        grandGrandParent.rightChild = parent.setParent(grandGrandParent);
      }
    }
  }

  private rotateLaneToRight() {
    const { parent } = this;
    if (!parent) {
      return;
    }

    const grandParent = parent.parent;
    if (!grandParent) {
      return;
    }

    const rootNode = this.findRootNode();
    const grandGrandParent = grandParent?.parent;

    grandParent.leftChild = parent.rightChild?.setParent(grandParent) ?? null;

    parent.rightChild = grandParent.setParent(parent);
    [parent.color, grandParent.color] = [grandParent.color, parent.color];

    if (rootNode === grandParent) {
      parent.isRoot();
    } else if (grandGrandParent) {
      if (grandGrandParent.leftChild === grandParent) {
        grandGrandParent.leftChild = parent.setParent(grandGrandParent);
      } else {
        grandGrandParent.rightChild = parent.setParent(grandGrandParent);
      }
    }
  }
}
