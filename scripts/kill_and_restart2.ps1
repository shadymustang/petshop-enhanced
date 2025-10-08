$ports = 3000..3006
$found = @()
foreach ($p in $ports) {
  # Try Get-NetTCPConnection first (Windows 8+). If unavailable, fallback to netstat parse.
  try {
    $conns = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction Stop
    foreach ($c in $conns) { $found += [pscustomobject]@{Port=$p; PID=$c.OwningProcess} }
  } catch {
    $lines = (netstat -ano | Select-String ":$p\s").ToString().Trim()
    if ($lines) {
      $parts = $lines -split '\s+'; $pid = $parts[-1]
      $found += [pscustomobject]@{Port=$p; PID=[int]$pid}
    }
  }
}

if ($found.Count -eq 0) {
  Write-Output "No listeners found on ports $($ports[0])..$($ports[-1])"
} else {
  Write-Output "Listeners found:"
  $found | Sort-Object Port | ForEach-Object {
    $pidVal = $_.PID
    $proc = $null
    try { $proc = Get-Process -Id $pidVal -ErrorAction Stop } catch { }
    if ($proc) { Write-Output ("Port " + $_.Port + ": PID " + $pidVal + " => " + $proc.ProcessName) } else { Write-Output ("Port " + $_.Port + ": PID " + $pidVal + " => (process not found)") }
  }

  # Attempt to stop each unique PID
  $unique = $found | Select-Object -ExpandProperty PID -Unique
  foreach ($pidVal in $unique) {
    Write-Output ("Attempting to stop PID " + $pidVal)
    try {
      Stop-Process -Id $pidVal -Force -ErrorAction Stop
      Write-Output ("Stop-Process succeeded for " + $pidVal)
    } catch {
      Write-Output ("Stop-Process failed for " + $pidVal + ", trying taskkill")
      try {
        & cmd /c "taskkill /PID $pidVal /F" | Out-Null
        Write-Output ("taskkill succeeded for " + $pidVal)
      } catch {
        Write-Output ("taskkill failed for " + $pidVal + ":")
        Write-Output $_.Exception.Message
      }
    }
  }
}

Start-Sleep -Seconds 1

# Verify port 3000 is free
$inUse = netstat -ano | Select-String ":3000\s"
if ($inUse) { Write-Output "Port 3000 still in use after kill attempts:"; $inUse | ForEach-Object { Write-Output $_ } }
else { Write-Output "Port 3000 appears free; starting Next on 3000" }

$env:PORT='3000'
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput .\..\tmp_next_dev_out.txt -RedirectStandardError .\..\tmp_next_dev_err.txt -NoNewWindow -PassThru | Out-Null
Start-Sleep -Seconds 5
Write-Output '=== DEV STDERR ==='
if (Test-Path ..\tmp_next_dev_err.txt) { Get-Content ..\tmp_next_dev_err.txt -Tail 200 } else { Write-Output '(no stderr file)' }
Write-Output '=== DEV STDOUT ==='
if (Test-Path ..\tmp_next_dev_out.txt) { Get-Content ..\tmp_next_dev_out.txt -Tail 200 } else { Write-Output '(no stdout file)' }
