module.exports =

  account_collection:
    title: "Accounts"
    description: """
      The accounts resource is primarily used to create an account. Simply `POST` to the
      accounts resource with an entity body including an email and password.
    """
    actions:
      create:
        description: "Create a new account. The response will contain a session."
        method: "POST"
        request_entity: "account"
        response_entity: "session"
        status: 201

  account:
    description: """
      An account resource allows you to get information about your account, update it, or
      close it entirely.
    """
    actions:
      get:
        description: "Get information about your account"
        method: "GET"
        authorization: "Capability"
        response_entity: "account"
        status: 200
      update:
        method: "PUT"
        authorization: "Capability"
        request_entity: "account"
        response_entity: "account"
        status: 200
      reset:
        method: "POST"
        authorization: "Capability"
        response_entity: "account"
        status: 201
      delete:
        method: "DELETE"
        authorization: "Capability"
        status: 204

  session_collection:
    description: "The place to get sessions from"
    actions:
      create:
        method: "POST"
        authorization: "Capability"
        request_entity: "account"
        response_entity: "session"
        status: 201

  session:
    actions:
      get:
        method: "GET"
        authorization: "Capability"
        response_entity: "session"
        status: 200
      delete:
        method: "DELETE"
        authorization: "Capability"
        status: 204

  channel_collection:
    description: "The collection of channels for a particular account"
    actions:
      get_by_name:
        method: "GET"
        query:
          required:
            name:
              description: "The exact name of a channel"
              type: "string"
        response_entity: "channel_dictionary"
        authorization: "Capability"
      all:
        method: "GET"
        response_entity: "channel_dictionary"
        authorization: "Capability"
      create:
        method: "POST"
        request_entity: "channel"
        response_entity: "channel"
        authorization: "Capability"

  channel:
    description: "The channel resource"
    actions:
      get:
        method: "GET"
        authorization: "Capability"
        response_entity: "channel"
      publish:
        method: "POST"
        authorization: "Capability"
        request_entity: "message"
        response_entity: "message"
      delete:
        method: "DELETE"
        authorization: "Capability"

  subscription_collection:
    actions:
      create:
        method: "POST"
        authorization: "Capability"
        request_entity: "subscription"
        response_entity: "subscription"
      get_by_name:
        method: "GET"
        response_entity: "subscription_dictionary"
        query:
          required:
            name:
              description: "The exact name of the subscription"
              type: "string"
        authorization: "Capability"
      all:
        method: "GET"
        response_entity: "subscription"
        authorization: "Capability"
        
  subscription:
    actions:
      events:
        method: "GET"
        authorization: "Capability"
        response_entity: "event_slice"

  message:
    actions:
      get:
        method: "GET"
        authorization: "Capability"
        response_entity: "message"
      update:
        method: "PUT"
        request_entity: "message"
        response_entity: "message"
        authorization: "Capability"
      delete:
        method: "DELETE"
        authorization: "Capability"
