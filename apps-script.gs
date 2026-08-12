/**
 * MASK PAP Adherence — Google Apps Script
 * Writes to "MASK Data" tab. One row per patient record.
 * Deploy: Extensions → Apps Script → Deploy → New Deployment
 * Type: Web App | Execute as: Me | Access: Anyone
 */
function doPost(e) {
  var lock = LockService.getPublicLock(); lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('MASK Data');
    if (!sheet) {
      sheet = ss.insertSheet('MASK Data');
      sheet.appendRow([
        'Timestamp','Patient ID','Name/Initials','Enrollment Date','Age','Sex','BMI',
        'PSG AHI','PSG ODI','LSAT (%)','T90 (hrs)','STOP-BANG','ESS Baseline',
        'Comorbidities','Nasal Septal Deviation','Allergic Rhinitis','Facial Hair','Dentition',
        'Face Width (mm)','Face Length (mm)','Nasal Bridge Width (mm)','Nasal Alar Width (mm)',
        'Nasal Depth (mm)','Mouth Width (mm)','Interpupillary Distance (mm)',
        'Wears Glasses in Bed','Sensitive Nostrils','Tosses & Turns',
        'Claustrophobia (0-10)','Preferred Sleep Position','Hand Grasping Difficulty',
        'Frequent Nasal Congestion','Bed Partner Present',
        'MyMask AI Used','AI Recommended Type','No. Masks Tried','Fitting Position',
        'Fitting Time (min)','Pressure Trial During Fitting',
        'Patient Most Comfortable Type','AI Concordant',
        'Final Mask Brand & Model','Final Mask Type','Cushion Material','Headgear Type',
        'Device Model','Humidification Type','Heated Tube Used',
        'Mask Changed (1 wk)','Avg Usage (hrs/night)','Mask Leak 95th (L/min)'
      ]);
      sheet.getRange(1,1,1,51).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.timestamp, d.patient_id, d.name_initials, d.enrollment_date, d.age, d.sex, d.bmi,
      d.psg_ahi, d.psg_odi, d.lsat_pct, d.t90_hours, d.stopbang, d.ess_baseline,
      d.comorbidities, d.nasal_septal_deviation, d.allergic_rhinitis, d.facial_hair, d.dentition,
      d.face_width_mm, d.face_length_mm, d.nasal_bridge_width_mm, d.nasal_alar_width_mm,
      d.nasal_depth_mm, d.mouth_width_mm, d.interpupillary_mm,
      d.wears_glasses_bed, d.sensitive_nostrils, d.tosses_turns,
      d.claustrophobia_0_10, d.sleep_position, d.hand_grasping,
      d.nasal_congestion, d.bed_partner,
      d.ai_used, d.ai_recommended_type, d.num_masks_tried, d.fitting_position,
      d.fitting_time_min, d.pressure_trial,
      d.patient_comfortable_type, d.ai_concordant,
      d.final_mask_brand_model, d.final_mask_type, d.cushion_material, d.headgear_type,
      d.device_model, d.humidification, d.heated_tube,
      d.mask_changed, d.avg_usage_hrs, d.mask_leak_95th
    ]);
    return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error',message:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}
function doGet(e) {
  var p = e.parameter;
  if (p.action === 'collision') {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('MASK Data');
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService.createTextOutput(JSON.stringify({collision:false})).setMimeType(ContentService.MimeType.JSON);
    }
    var ids = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat().map(String);
    return ContentService.createTextOutput(JSON.stringify({collision: ids.includes(String(p.patient_id))})).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({status:'ready',message:'MASK PAP Adherence collector is active.'})).setMimeType(ContentService.MimeType.JSON);
}
