$ErrorActionPreference = "Stop"

function DeletePreviousVersionIfExists()
{

  If (test-path "..\migrations\v1")
  {
    Remove-Item "..\migrations\v1" -Recurse
  }; if ($?)
  {
    gsutil -m rm -r gs://set-database-migration/v1
  }; if (-not$?)
  {
    gsutil -m rm -r gs://set-database-migration/v1
  }

}

function ExportStageFirebaseToEmulator()
{

  gcloud firestore export gs://set-database-migration/v1

  gsutil -m cp -r gs://set-database-migration/v1 ../migrations

}



DeletePreviousVersionIfExists; if ($?)
{
  ExportStageFirebaseToEmulator
}
; if (-not$?)
{
  ExportStageFirebaseToEmulator
}
