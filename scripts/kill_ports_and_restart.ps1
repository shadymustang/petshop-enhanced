$ports = 3000..3006
$pids = @()
foreach ($p in $ports) {
  try {
    $list = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction Stop
    foreach ($l in $list) { $pids += $l.OwningProcess }
  } catch {
    $out = netstat -ano | Select-String ":$p\s" | ForEach-Object { ($_ -split '\s+')[-1] }
    if ($out) { $pids += $out }
  }
}
$pids = $pids | Where-Object { $_ -ne $null } | Sort-Object -Unique
if ($pids.Count -eq 0) { Write-Output 'No processes found listening on ports 3000..3006'; exit 0 }
Write-Output 'Found PIDs: ' + ($pids -join ', ')
foreach ($pid in $pids) {
  try {
    Write-Output ("Killing PID " + $pid)
    Stop-Process -Id $pid -Force -ErrorAction Stop
    Write-Output ("Killed " + $pid)
  } catch {
    Write-Output ("Failed to kill " + $pid + ":")
    Write-Output $_.Exception.Message
  }
}
Start-Sleep -Seconds 1
$env:PORT = '3000'
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -RedirectStandardOutput .\..\tmp_next_dev_out.txt -RedirectStandardError .\..\tmp_next_dev_err.txt -NoNewWindow -PassThru | Out-Null
Start-Sleep -Seconds 4
Write-Output '=== DEV STDERR ==='
if (Test-Path ..\tmp_next_dev_err.txt) { Get-Content ..\tmp_next_dev_err.txt -Tail 200 } else { Write-Output '(no stderr file)' }
Write-Output '=== DEV STDOUT ==='
if (Test-Path ..\tmp_next_dev_out.txt) { Get-Content ..\tmp_next_dev_out.txt -Tail 200 } else { Write-Output '(no stdout file)' }
