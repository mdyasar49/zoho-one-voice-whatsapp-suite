/**
 * Zoho CRM Embedded App SDK Wrapper
 * Connects directly to Zoho CRM window if present, otherwise provides interactive demo mode.
 */

class ZohoSDKService {
  constructor() {
    this.isZohoEnvironment = false;
    this.currentEntity = null;
    this.currentRecord = null;
  }

  async initialize() {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.ZOHO && window.ZOHO.embeddedApp) {
        window.ZOHO.embeddedApp.on("PageLoad", async (data) => {
          console.log("⚡ Zoho CRM PageLoad Event:", data);
          this.isZohoEnvironment = true;
          this.currentEntity = data.Entity;
          this.currentRecord = data.EntityId;

          // Fetch full record details from Zoho CRM
          try {
            const recordData = await window.ZOHO.CRM.API.getRecord({
              Entity: data.Entity,
              RecordID: data.EntityId
            });
            console.log("Zoho Record Data:", recordData);
            resolve({
              isZoho: true,
              entity: data.Entity,
              recordId: data.EntityId,
              record: recordData.data?.[0] || null
            });
          } catch (err) {
            console.warn("Could not fetch full record from Zoho API:", err);
            resolve({ isZoho: true, entity: data.Entity, recordId: data.EntityId, record: null });
          }
        });

        window.ZOHO.embeddedApp.init();
      } else {
        // Standalone Browser Demo Mode
        console.log("Running in standalone/preview mode (Mock Zoho environment active)");
        this.isZohoEnvironment = false;
        resolve({
          isZoho: false,
          entity: "Leads",
          recordId: "48291000000213001",
          record: {
            Full_Name: "Raveena Arun",
            Phone: "+91 98765 43210",
            Company: "TechNova Corp",
            Email: "raveena@example.com",
            Lead_Status: "Contacted"
          }
        });
      }
    });
  }

  async resizeWidget(width = 450, height = 700) {
    if (this.isZohoEnvironment && window.ZOHO && window.ZOHO.CRM && window.ZOHO.CRM.UI) {
      try {
        await window.ZOHO.CRM.UI.Resize({ height, width });
      } catch (err) {
        console.warn("Resize error:", err);
      }
    }
  }
}

export const zohoSDK = new ZohoSDKService();
