RegisterNetEvent('characters:server:setupCharacters', function()
    local _source = source
    local user = exports.core:GetUser(_source)

    if not user then
        return
    end

    MySQL.query('SELECT * FROM characters WHERE discord_id = ?', {
        user.getDiscordId()
    }, function(characters)
        exports.core:Log(characters)
        -- user.setCharacters(characters)
    end)
end)