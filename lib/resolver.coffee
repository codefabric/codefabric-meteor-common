namespace 'CodeFabric', (ns) ->

  class Resolver
    @registrations = {}

    @__registerDeps: (def, result) ->
      if Meteor.settings.public.debug
        console.log "Registering dependencies and constructor for #{def.name}"

      result.push def.name
      result.push def.instance || def.constructor
      
      Resolver.registrations[def.name] = 
        constructor: def.constructor
        instance: def.instance
        dependencies: def.dependencies

      return result

    @depends: (factoryDefs) ->
      result = []

      if factoryDefs.constructor == Array
        return Resolver.__registerDeps factoryDef, result for factoryDef in factoryDefs
      else
        return Resolver.__registerDeps factoryDefs, result

    @resolve: (name, args) ->      
      if Meteor.settings.public.debug
        console.log "Resolving #{name}..."

      reg = Resolver.registrations[name]
      unless reg? #We don't have a registered constructor, so assume its in the args (undefined otherwise)
        if Meteor.settings.public.debug
          console.log "Could not find registration for #{name}, using args"

        value = args[name]

        if Meteor.settings.public.debug
          console.log "Found arg for #{name}: #{value}"

        return value

      if reg.instance?
        return reg.instance

      constructorArgs = [reg.constructor]
      for argName, dep of reg.dependencies

        if Meteor.settings.public.debug
          console.log "Resolving dependency of #{name} (#{argName})"

        constructorArgs.push(Resolver.resolve dep, args)

      if Meteor.settings.public.debug
        console.log "Running constructor for #{name}"
      return new (Function.bind.apply(reg.constructor, constructorArgs))


  return ['Resolver', Resolver]