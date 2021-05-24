// const makeMap = async (target,center={lat: 37.786159,lng: -122.399206}) => {
//    await checkData(()=>window.google);
//    	let map = new google.maps.Map(
//       $(target)[0],
//       {
//          center: center,
//          zoom: 12,
//          disableDefaultUI: true
//       }
//     );
//    	new google.maps.Marker({
//         position: center,
//         map: map,
//     });
// }


//map_el: html makeMap
const makeMap = async (target,center={lat: 37.755386,lng: -122.434243}) => {
   await checkData(()=>window.google);

   let map_el = $(target);

   // map = map_el.data("map");

  if(!map_el.data("map")) map_el.data({
      "map": new google.maps.Map(
         map_el[0],
         {
            center: center,//map location: center
            zoom: 12,//number higher:zoom in
            disableDefaultUI: true,//remove UI information
            styles:mapStyles//style from snazzy maps
         }
      ),
      "infoWindow": new google.maps.InfoWindow({content:''})
      

      // Create the Name 
      // definition(Uppercase):definition of object; 
      // instance(lowercase):instance of object base on type of object;
   });

   return map_el;
}

//makeMarkers in map
//Remove markers
const makeMarkers = (map_el,map_locs) => {
  //map_locs:database_data marker
   let map = map_el.data("map");
   let markers = map_el.data("markers");

   if(markers) markers.forEach(o=>o.setMap(null));//remove marker

   markers = [];//Google map marker
   // forEach: loop object in function

   map_locs.forEach(o=>{
      let m = new google.maps.Marker({
         position: o,
         map: map,
         icon: {
         //json.template/Locations Data/icon
            url: o.icon,
            scaledSize: {
               width:40,
               height:40
            }
         }
      });
      markers.push(m);
   });

   map_el.data("markers",markers);
   setTimeout(()=>{setMapBounds(map_el,map_locs)},150);
}
const setMapBounds = (map_el,map_locs) => {
   let map = map_el.data("map");
   let zoom = 14;

   if(map_locs.length==1) {
      map.setCenter(map_locs[0]);
      map.setZoom(zoom);
   } else if(map_locs.length==0) {
      if(window.location.protocol!=="https:") return;
      else {
         navigator.geolocation.getCurrentPosition(p=>{
            let pos = {
               lat:p.coords.latitude,
               lng:p.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(zoom);
         },(...args)=>{
            console.log(args)
         },{
            enableHighAccuracy:false,
            timeout:5000,
            maximumAge:0
         })
      }
   } else {
      let bounds = new google.maps.LatLngBounds(null);
      map_locs.forEach(o=>{
         bounds.extend(o);
      });
      map.fitBounds(bounds);
   }
}




// snazzymaps.com

let mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ddd4cf"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ddd4cf"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ddd4cf"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ddd4cf"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ece7e3"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ece7e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ece7e3"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f79339"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 80
            },
            {
                "visibility": "on"
            },
            {
                "hue": "#f79339"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f79339"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#f79339"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f79339"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f7f3f0"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
