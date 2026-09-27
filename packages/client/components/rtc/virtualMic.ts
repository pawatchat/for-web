export const pawatSinkName = "pawat-virtual-source";

export async function getVirtmic() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevice = devices.find(
      ({ label }) => label.split(":").pop() === pawatSinkName,
    );
    return audioDevice?.deviceId;
  } catch {
    return null;
  }
}
