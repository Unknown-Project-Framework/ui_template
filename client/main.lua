RegisterNetEvent('characters:client:setupCharacters', function()
    TriggerServerEvent('characters:server:setupCharacters')
end)
