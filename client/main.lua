local cams = {}
local activeCam = 1
local cameraThread = false

Citizen.CreateThread(function()
    for i, cam in ipairs(Config.Cams) do
        cams[i] = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam.camCoords.x,
            cam.camCoords.y, cam.camCoords.z, cam.camRot.x,
            cam.camRot.y, cam.camRot.z, 50.00, false, 0)
    end
end)



RegisterNetEvent('characters:client:loadCharactersNUI', function(_characters)
    ShutdownLoadingScreenNui()
    DoScreenFadeOut(0)

    Citizen.Wait(2000)
    DoScreenFadeIn(800)

    StartCameraThread()


    SendNUIMessage({
        type = 'loadCharacters',
        data = _characters,
    })

    SetNuiFocus(true, true)
end)


function StartCameraThread()
    if cameraThread then
        return
    end

    local playerPed = PlayerPedId()
    SetEntityCoords(playerPed, Config.Cams[1].camCoords.x, Config.Cams[1].camCoords.y,
        Config.Cams[1].camCoords.z, false, false, false, true)
    SetCamActive(cams[activeCam], true)
    RenderScriptCams(true, false, 0, true, true)

    cameraThread = true

    Citizen.CreateThread(function()
        while cameraThread do
            NextCamera()
        end
    end)
end

function NextCamera()
    Citizen.Wait(Config.Cams[activeCam].timeout)

    if not cameraThread then
        return
    end

    activeCam = activeCam + 1

    if activeCam > #cams then
        activeCam = 1
    end

    DoScreenFadeOut(500)
    Citizen.Wait(500)

    SetCamActive(cams[activeCam], true)
    RenderScriptCams(true, false, 0, true, true)

    Citizen.Wait(500)
    DoScreenFadeIn(500)
end

function StopCameraThread()
    if not cameraThread then
        return
    end

    cameraThread = false

    RenderScriptCams(false, false, 0, true, true)
    for i, cam in ipairs(cams) do
        SetCamActive(cam, false)
    end

    activeCam = 1
end

-- TEST CAM
RegisterCommand('stopcam', function()
    StopCameraThread()
end, false)

RegisterCommand('startcam', function()
    StartCameraThread()
end, false)


RegisterCommand('cam', function()
    local coords, heading = GetFinalRenderedCamCoord(), GetFinalRenderedCamRot(0)

    SendNUIMessage({
        type = 'clipboard',
        data = '{' .. vec(coords.x, coords.y, coords.z) .. ', ' .. vec(heading.x, heading.y, heading.z) .. ' }'
    })
end, false)
