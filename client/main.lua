RegisterNetEvent('characters:client:loadCharactersNUI', function(_characters)
    ShutdownLoadingScreenNui()

    Wait(500)

    exports.core:Log('Loading characters NUI')

    SendNUIMessage({
        type = 'loadCharacters',
        data = _characters,
    })
end)
