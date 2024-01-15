RegisterNetEvent('characters:server:setupCharacters', function(_source)
    if not _source then
        return
    end

    local user = exports.core:GetUser(_source)

    if not user then
        return
    end

    MySQL.query('SELECT * FROM characters WHERE discord_id = ?', {
        user.getDiscordId()
    }, function(characters)
        user.setCharacters(characters)
        TriggerClientEvent('characters:client:loadCharactersNUI', _source, characters)
    end)
end)

RegisterNetEvent('characters:server:createCharacter', function(_payload)
    local _source = source

    if not _source then
        return
    end

    local user = exports.core:GetUser(_source)

    if not user then
        return
    end

    user.addCharacter(_payload)
end)
