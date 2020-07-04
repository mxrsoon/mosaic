import { Widget } from "../../core/index.js";
import { PrivateFields, WidgetList, PropertySet } from "../../utils/index.js";

/* Default properties for Container class. */
const properties = new PropertySet(function() {
	return {
        children: []
    };
});

/* Private fields map for Application class. */
const privates = new PrivateFields(function(children) {
    return {
        get children() {
            return children;
        },

        onChildrenChange(collection, added, removed) {
            for (let widget of added) {
                if (widget.parent instanceof Container) {
                    widget.parent.children.remove(widget);
                }

                widget.parent = this;
            }

            for (let widget of removed) {
                if (widget.parent === this) {
                    widget.parent = undefined;
                }
            }

            this.invalidate();
        }
    };
});

/**
 * Container that contains Widgets.
 */
export class Container extends Widget {
	constructor(props) {
        super(props);

        privates.setup(this, new WidgetList(props.children));
        delete props.children;

        properties.apply(this, props);

        Object.defineProperty(this, "children", {
			enumerable: true,
			configurable: false,

            get() {
				return privates(this).children;
			}
        });
        
        this.children.observe(privates(this).onChildrenChange);
        privates(this).onChildrenChange(this.children, this.children.toArray(), []);
    }
    
    /**
     * Container's child widgets.
     * @type {WidgetList}
     */
    get children() { /* Placeholder, just for autocompletion */ }

    get childCount() {
        return this.children.length;
    }

    addChild(...widgets) {
        this.children.add(...widgets);
    }

    removeChild(widget) {
        return this.children.remove(widget);
    }

    insertChild(index, widget) {
        return this.children.insert(index, widget);
    }

    getChild(index) {
        return this.children.get(index);
    }

    /**
     * Search for a Widget with the specified id that is descendant of this container.
     * @param {string} id - ID to search for.
     * @returns {?Widget} A widget with the searched ID if it was found, or undefined if not.
     */
    findById(id) {
        for (let child of this.children) {
            if (child.id === id) {
                return child;
            } else if (child instanceof Container) {
                const result = child.findById(id);
                
                if (result) {
                    return result;
                }
            }
        }
    }

    /**
     * Search for a Widget that is an instance of a specified class and descendant of this Container.
     * @param {typeof Widget} queryClass - Class that the wanted widget is instance of.
     * @param {boolean} subClasses - Include widgets that are of subclasses of the requested class in the search.
     * @returns {?Widget} A widget that is an instance of "queryClass" if found, or undefined if not.
     */
    findByClass(queryClass, subClasses = true) {
        if (subClasses) {
            for (let child of this.children) {
                if (child instanceof queryClass) {
                    return child;
                } else if (child instanceof Container) {
                    const result = child.findByClass(queryClass, subClasses);
                    
                    if (result) {
                        return result;
                    }
                }
            }
        } else {
            for (let child of this.children) {
                if (child.constructor === queryClass) {
                    return child;
                } else if (child instanceof Container) {
                    const result = child.findByClass(queryClass, subClasses);
                    
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }

    /**
     * Search for all Widgets that are instances of a specified class and descendants of this Container.
     * @param {typeof Widget} queryClass - Class that the wanted widgets are instances of.
     * @param {boolean} subClasses - Include widgets that are of subclasses of the requested class in the search.
     * @returns {Widget[]} Array containing all widgets that are an instances of "queryClass".
     */
    findAllByClass(queryClass, subClasses = true) {
        const result = [];

        if (subClasses) {
            for (let child of this.children) {
                if (child instanceof queryClass) {
                    result.push(child);
                } else if (child instanceof Container) {
                    result.push(...child.findAllByClass(queryClass, subClasses));
                }
            }
        } else {
            for (let child of this.children) {
                if (child.constructor === queryClass) {
                    result.push(child);
                } else if (child instanceof Container) {
                    result.push(...child.findAllByClass(queryClass, subClasses));
                }
            }
        }

        return result;
    }

    getWidgetsAt(x, y) {
        const result = [];
        let child;
        
        for (let i = this.childCount - 1; i >= 0; i--) {
            child = this.getChild(i);
            
            if (child instanceof Container) {
                result.push(...child.getWidgetsAt(x, y));
            } else if (child.hitTest(x, y)) {
                result.push(child);
            }
        }

        if (this.hitTest(x, y)) {
            result.push(this);
        }

        return result;
    }
	
	draw(canvas) {
        for (let child of this.children) {
            try {
                child.draw(canvas);
            } catch (e) {
                console.error(e);
            }
        }
	}
}