let map;
let marker;
let mapModal = document.getElementById('mapModal');
let closeModal = document.querySelector('.close-modal');

// Initialize the modal functionality
document.querySelectorAll('.view-location-btn').forEach(button => {
    button.addEventListener('click', function() {
        const lat = parseFloat(this.getAttribute('data-lat'));
        const lng = parseFloat(this.getAttribute('data-lng'));
        const name = this.getAttribute('data-name');
        const phone = this.getAttribute('data-phone');
        const status = this.getAttribute('data-status');
        const devices = this.getAttribute('data-devices');
        
        // Set modal content
        document.getElementById('modalClientName').textContent = name;
        document.getElementById('modalClientPhone').textContent = phone;
        document.getElementById('modalClientStatus').textContent = status;
        document.getElementById('modalClientStatus').className = status === 'Actif' ? 'status-active' : 'status-inactive';
        
        // Clear and populate devices list
        const devicesList = document.getElementById('modalClientDevices');
        devicesList.innerHTML = '';
        devices.split(', ').forEach(device => {
            const li = document.createElement('li');
            li.textContent = device;
            devicesList.appendChild(li);
        });
        
        // Show modal
        mapModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Initialize or update the map
        initMap(lat, lng, name);
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', function() {
    mapModal.style.display = 'none';
    document.body.style.overflow = '';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === mapModal) {
        mapModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

function initMap(lat, lng, name) {
    const position = { lat: lat, lng: lng };
    
    // If map already exists, just move it
    if (map) {
        map.setCenter(position);
        map.setZoom(15);
        if (marker) {
            marker.setPosition(position);
        } else {
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: name,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                }
            });
        }
        return;
    }
    
    // Initialize new map
    map = new google.maps.Map(document.getElementById('surveillanceMap'), {
        zoom: 15,
        center: position,
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Add marker
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: name,
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
    });
}