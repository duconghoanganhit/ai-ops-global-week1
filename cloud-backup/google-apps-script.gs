/**
 * OPTIONAL $0 BACKUP CLOUD RUNNER — Google Apps Script (runs on Google Cloud when PC is OFF)
 * Use this ONLY if you prefer Google Drive (anh.origin@gmail.com) instead of GitHub Actions.
 *
 * Setup (2 mins):
 * 1) Open https://script.google.com -> New project
 * 2) Paste this file, add Script Property GEMINI_API_KEY (from https://aistudio.google.com/apikey)
 * 3) Triggers -> Add Trigger -> runCloudTick -> Time-driven -> Every 30 minutes
 */

function runCloudTick() {
  var vnHour = Number(Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'H'));
  if (vnHour >= 20) {
    Logger.log('Rest window 20:00-24:00 GMT+7 — skipping cleanly.');
    return;
  }

  var apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) {
    Logger.log('Missing GEMINI_API_KEY in Script Properties.');
    return;
  }

  var folderName = 'AI-Ops-Global-Week1';
  var folders = DriveApp.getFoldersByName(folderName);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

  var prompt =
    'Write 3 native-English high-CTR YouTube title ideas + 1 Pinterest Pin copy for Etsy sellers (ProfitPulse). Keep under 250 words.';

  var res = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-goog-api-key': apiKey,
      'Api-Revision': '2026-05-20',
    },
    payload: JSON.stringify({
      model: 'gemini-3.8-flash',
      input: prompt,
    }),
    muteHttpExceptions: true,
  });

  var stamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyyMMdd_HHmm');
  folder.createFile('cloud_output_' + stamp + '.md', res.getContentText(), MimeType.PLAIN_TEXT);
}
