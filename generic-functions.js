import "primitive-type.js";

definePrimitiveType("generic-function", [], [
    "name",
    "args",
    {name: "methods", default: []}]);

definePrimitiveType("method", [], [
    "specializers",
    "qualifier",
    "fun"]);

let noValue = ["NO VALUE"];

export function defineGenericFunction(name, args){
    let fun = {};
    fun = {[name](...args){
        // Implicitly compute the set of applicable methods and invoke them.
        // We have no call-next-method, so we only invoke the first primary
        // and store the result. Otherwise rely on the methods in the generic
        // function being pre-sorted by addMethod.
        //
        // We use a special value here as the method might return undefined
        // on its own. The only placeholder we can use is another unique
        // value the user can't touch.
        let result = noValue;
        for(let method of fun.methods){
            if(isApplicable(method, args)){
                if(method.qualifier === null){
                    if(result === noValue){
                        result = method.fun.apply(this, args);
                    }
                }else{
                    method.fun.apply(this, args);
                }
            }
        }
        if(result === noValue)
            throw new Error("No applicable primary method for "+name+"("+args.join(",")+")");
        return result;
    }}[name];
    return makeInstance("generic-function", {
        name: name,
        args: args
    }, fun);
}

function methodSpecificityOrder(a, b){
    if(a.qualifier === b.qualifier){
        for(let i=0; i<a.specializers.length; ++i){
            let as = a.specializers[i];
            let bs = b.specializers[i];
            if(subTypeOf(bs, as))
                return -1;
            if(subTypeOf(as, bs))
                return +1;
        }
        return 0;
    }
    if(a.qualifier === "before") return -1;
    if(a.qualifier === "after") return +1;
    return 0;
}

function addMethod(name, method){
    if(window[name] === undefined){
        defineGenericFunction(name, method.args);
    }
    let genfun = checkInstanceOf("generic-function", window[name]);
    genfun.methods.push(method);
    genfun.methods.sort(methodSpecificityOrder);
    return method;
}

export function defineMethod(name, qualifier, args, body){
    if(!["before","after",null].includes(qualifier))
        throw new Error("Invalid method qualifier "+qualifier);
    let methodName = name+"("+args.join(",")+")";
    let fun = {[methodName](...args){
        body.apply(this, args);
    }}[methodName];
    return addMethod(name, makeInstance("method", {
        specializers: args,
        qualifier: qualifier,
        fun: fun
    }));
}
