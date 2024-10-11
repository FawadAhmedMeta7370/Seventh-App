interface Places {
  title?: string;
  imageUri?: string;
  address?: string;
  location?: {
    lat: number;
    long: number; // Use "long" consistently
  };
  id: number;
}

class Place implements Places {
  id: number;
  title?: string;
  imageUri?: string;
  address?: string;
  location?: {
    lat: number;
    long: number; // Use "long" here instead of "lng"
  };

  constructor(
    title: string,
    imageUri: string,
    location: { address: string; lat: number; long: number },
    id: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, long: location.long }; // Correct "long"
    this.id = id;
  }
}

export default Place;
