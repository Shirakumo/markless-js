primitiveTypes = {};

export function primitiveType(name){
    let type = primitiveTypes[name];
    if(type === undefined) throw new Error("No such primitive type "+name);
    return type;
}

export function isPrimitiveType(name){
    return (primitiveTypes[name] !== undefined);
}

export function isInstanceOf(name, instance){
    if(instance.type === undefined) return false;
    if(instance.type === name) return true;
    for(super of primitiveType(name).supers){
        if(instance.type === super) return true;
    }
    return false;
}

function initSlot(instance, slot, args){
    if(args === undefined) args = {};
    if(args[slot.name] !== undefined){
        instance[slot.name] = args[slot.name];
    }else if(slot.required){
        throw new Error("Slot "+slot.name+" is required for "+name+", but was not given");
    }else{
        instance[slot.name] = slot.default;
    }
}

export function makePrimitiveType(name, args){
    if(args === undefined) args = {};
    let type = primitiveType(name);
    let instance = {};
    instance.type = name;
    for(let slotName in type.slots){
        initSlot(instance, type.slots[slotName], args);
    }
    return instance;
}

export function changePrimitiveType(instance, name, args){
    if(args === undefined) args = {};
    let newType = primitiveType(name);
    let oldType = primitiveType(instance.type);
    // NOTE: this is not quite correct as we keep sharing slots even if the
    //       type ancestry of who defines the slot is disjoint. But w/e.
    for(let slotName in newType.slots){
        if(oldType.slots[slotName] === undefined){
            delete instance[slotName];
        }else if(instance[slotName] === undefined){
            initSlot(instance, newType.slots[slotName], args);
        }
    }
    instance.type = name;
    return intsance;
}

function computeClassPrecedenceList(cls){
    let nodes = {}, edges = {}, sorted = [];
    let map;
    map = (name)=>{
        nodes[name] = "unvisited";
        edges[name] = new Set();
        let prev = name;
        for(let s of primitiveType(name).directSupers){
            edges[prev].add(s);
            map(s);
            prev = s;
        }
    };
    map(cls.name);
    // Tarjan
    let visit;
    visit = (name)=>{
        if(nodes[name] === "temporary")
            throw new Error("Circular references in supertype hierarchy");
        nodes[name] = "temporary";
        for(target of (edges[name]||[])){
            visit(target);
        }
        delete nodes[name];
        sorted.push(name);
    };
    for(;;){
        let name = Object.keys(nodes)[0];
        if(name === undefined) break;
        visit(name);
    }
    return sorted;
}

function computeSlots(type){
    let slots = {};
    for(let name in type.directSlots){
        slots[name] = type.directSlots[name];
    }
    for(let name of type.supers){
        let type = primitiveType(name);
        for(let slotName in type.slots){
            if(slots[slotName] === undefined){
                slots[slotName] = type.slots[slotName];
            }
        }
    }
    return slots;
}

export function definePrimitiveType(name, directSupers, slotdefs){
    if(slotdefs === undefined) slotdefs = [];
    let slots = {}, directSlots = {}, type = {};
    // Normalize slot definitions
    for(let def of slotdefs){
        let slotDef = (typeof def === 'object')? def : {name: slot};
        let slot = {};
        slot.name = name;
        slot.default = slotDef["default"];
        slot.required = (slotDef["required"] === undefined)
            ? (slotDef["default"] === undefined)
            : slotDef["required"];
        directSlots[name] = slot;
        slots[name] = slot;
    }
    // Register component type
    primitiveTypes[name] = type;
    type.name = name;
    type.directSupers = directSupers;
    type.directSlots = directSlots;
    type.supers = computeClassPrecedenceList(type);
    type.slots = computeSlots(type);
    type.make = (args)=>makePrimitiveType(name, args);
    return type;
}
