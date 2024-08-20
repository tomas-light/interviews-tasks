type Color = 'red' | 'black';

export class RedBlackTreeNode {
  private array: (number | null)[];
  private colors: (Color | null)[];
  constructor() {
    this.array = [null];
    this.colors = [null];
  }

  private findRootNode(): number {
    return this.array[1]!;
  }

  addValueToTree(value: number, color: Color = 'red') {
    let nodeIndex = 1;

    while (true) {
      const nodeValue = this.array[nodeIndex];
      if (nodeValue === null) {
        break;
      }

      const leftChildIndex = nodeIndex * 2;

      if (value >= nodeValue) {
        nodeIndex = leftChildIndex + 1;
        const rightChild = this.array[nodeIndex];

        if (rightChild == null) {
          this.array[nodeIndex] = value;
          this.colors[nodeIndex] = color;
          break;
        }
      } else {
        nodeIndex = leftChildIndex;
        const leftChild = this.array[nodeIndex];

        if (leftChild == null) {
          this.array[nodeIndex] = value;
          this.colors[nodeIndex] = color;
          break;
        }
      }
    }

    this.revalidateTreeForNode(nodeIndex);
  }

  private getParentIndex(index: number) {
    return Math.floor(index / 2);
  }
  private getParent(index: number) {
    const parentIndex = this.getParentIndex(index);
    return this.array[parentIndex];
  }
  private getGrandParentIndex(index: number) {
    return this.getParentIndex(this.getParentIndex(index / 2));
  }
  private getGrandParent(index: number) {
    const grandParentIndex = this.getGrandParentIndex(index);
    return this.array[grandParentIndex];
  }

  private revalidateTreeForNode(index: number) {
    const parentIndex = this.getParentIndex(index);
    const parent = this.array[parentIndex];
    const parentColor = this.colors[parentIndex];
    if (!parentColor || parentColor === 'black') {
      return;
    }

    const grandParentIndex = this.getParentIndex(parentIndex);
    const grandParent = this.array[grandParentIndex];
    if (grandParent == null) {
      return;
    }

    let uncleIndex = grandParentIndex * 2;
    if (uncleIndex === parentIndex) {
      uncleIndex = +1;
    }
    const uncleColor = this.colors[uncleIndex];

    if (!uncleColor || uncleColor === 'black') {
      // rotate and recolor

      if (this.isLeftTriangle(index)) {
        this.rotateTriangleToLeft(index);
      } else if (this.isRightTriangle(index)) {
        this.rotateTriangleToRight(index);
      } else if (parent.rightChild === this) {
        this.rotateLaneToLeft(index);
      } else {
        this.rotateLaneToRight(index);
      }
      return;
    }

    // red uncle
    this.colors[uncleIndex] = 'black';
    this.colors[parentIndex] = 'black';

    const rootNode = this.findRootNode();
    if (grandParent !== rootNode) {
      this.colors[grandParentIndex] = 'red';
      this.revalidateTreeForNode(grandParentIndex);
    }
  }

  private isLeftTriangle(index: number) {
    const parentIndex = this.getParentIndex(index);
    const parent = this.array[parentIndex];
    if (parent == null) {
      return false;
    }

    const grandParentIndex = this.getParentIndex(parentIndex);
    const grandParent = this.array[grandParentIndex];
    if (grandParent == null) {
      return false;
    }

    const leftUncleIndex = grandParentIndex * 2;
    const leftUncle = this.array[leftUncleIndex];

    const rightSiblingIndex = parent * 2;
    const rightSibling = this.array[rightSiblingIndex];

    const child = this.array[index];

    return leftUncle === parent && rightSibling === child;
  }

  private isRightTriangle(index: number) {
    const parentIndex = this.getParentIndex(index);
    const parent = this.array[parentIndex];
    if (!parent) {
      return false;
    }

    const grandParentIndex = this.getParentIndex(parentIndex);
    const grandParent = this.array[grandParentIndex];
    if (!grandParent) {
      return false;
    }

    const rightUncleIndex = grandParentIndex * 2 + 1;
    const rightUncle = this.array[rightUncleIndex];

    const leftSiblingIndex = parent * 2;
    const leftSibling = this.array[leftSiblingIndex];

    const child = this.array[index];

    return rightUncle === parent && leftSibling === child;
  }

  private rotateTriangleToLeft(index: number) {
    const parentIndex = this.getParentIndex(index);
    const parent = this.array[parentIndex];
    if (!parent) {
      return;
    }

    const grandParentIndex = this.getParentIndex(parentIndex);
    const grandParent = this.array[grandParentIndex];
    if (!grandParent) {
      return;
    }

    const rightSiblingIndex = parentIndex * 2 + 1;
    const leftChildIndex = index * 2;
    const leftUncleIndex = grandParentIndex * 2;

    this.array[rightSiblingIndex] = this.array[leftChildIndex];
    this.array[leftChildIndex] = this.array[parentIndex];
    this.array[leftUncleIndex] = this.array[index];
    this.rotateLaneToRight(parentIndex);

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
