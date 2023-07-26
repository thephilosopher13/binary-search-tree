const BSTModule = (() => { 

    const binarySearchTreeFactory = (array) => {

        function buildRootNode(array) {
            if (array.length === 0) {
                return null
            }
    
            const sortedArray = array.sort(((a, b) => a - b))
            const first = 0
            const last = sortedArray.length - 1
    
            if (sortedArray.length === 1) {
                return nodeFactory(array[0])
            }
    
            const mid = Math.floor((sortedArray.length)/2)
            const rootNode = nodeFactory(sortedArray[mid])
            rootNode.left = buildRootNode(sortedArray.slice(0, mid))
            rootNode.right = buildRootNode(sortedArray.slice((mid + 1)))
    
    
            return rootNode
        }

        function insert(value) {
            if (!this.root) {
                this.root = nodeFactory(value);
            } else {
                this.root.insertNode(value)
            }
        }

        function remove(value) {
            if (this.root) {
                this.root = this.root.deleteNode(value)
            }
        }

        function find(value) {
            if (this.root) {
                return this.root.findNode(value)
            }
        }


        const prettyPrint = (node, prefix = "", isLeft = true) => {
            if (node === null) {
              return;
            }
            if (node.right) {
              prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.left) {
              prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
          };

        return { 
            root: buildRootNode(array),
            insert,
            remove,
            find,
            prettyPrint
        }
    }

    const nodeFactory = (data) => {

        function insertNode(data) {
            if (this.data == data) return 
            else if (this.data > data) {
                if (this.left) this.left.insertNode(data);
                else this.left = nodeFactory(data)
            } else {
                if (this.right) this.right.insertNode(data);
                else this.right = nodeFactory(data)
            }
        }

        function deleteNode(data) {
            if (data < this.data && this.left) this.left = this.left.deleteNode(data)
            else if (data > this.data && this.right) this.right = this.right.deleteNode(data);

            else {
                if (this.right && this.left) {
                    let minValue = this.right.findMinValue()
                    this.data = minValue;
                    this.right = this.right.deleteNode(minValue);
                } else if (this.left) return this.left
                else if (this.right) return this.right
                else return null
            }

            return this;
        }

        function findNode(data) {
            let node
            if (data === this.data) return node = this;
            else if (data < this.data && this.left) {
                node = this.left.findNode(data)
                return node
            } else if (data > this.data && this.right) {
                node = this.right.findData(data)
                return node
            }
            return "Node not found"
        }

        const levelNode = function(callback) {
            let current = this
            let queue = [ current ]
            let result = []
            while (queue.length > 0) {
                result.push(current)
                queue.slice(0, 1)
                if (current.left) queue.push(current.left)
                if (current.right) queue.push(current.right)
                current = queue[0]
            }
            if (callback) return callback(result)
            return result
        }

        function findMinValue() {
            let current = this; // Root of right subtree
            while (current.left) current = current.left;
            return current.data;
          }

        return {
            data,
            left: null,
            right: null,
            insertNode,
            deleteNode,
            findNode
        }
    }




    return { binarySearchTreeFactory }
})();

const array = [1, 9, 6, 15, 12, 23, 27, 38]
const newTree = BSTModule.binarySearchTreeFactory(array)
newTree.prettyPrint(newTree.root)
newTree.insert(29)
newTree.prettyPrint(newTree.root)
newTree.remove(15)
newTree.prettyPrint(newTree.root)