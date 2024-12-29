jQuery(document).ready(function ($) {
    // Edit Modal functionality
    $('#editModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const id = button.data('id');
        const title = button.data('title');
        const content = button.data('content');
        const due_date = button.data('due_date');

        const modal = $(this);
        modal.find('#edit-id').val(id);
        modal.find('#edit-title').val(title);
        modal.find('#edit-content').val(content);
        modal.find('#edit-due-date').val(due_date);

        // Change form action to include the to-do ID for updating
        modal.find('#editForm').attr('action', '/edit_todo/' + id);
    });

    // Add event listener to the image elements to open modal with the clicked image
    const todoImages = document.querySelectorAll('.todo-image');
    todoImages.forEach(img => {
        img.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-src');
            const modalImage = document.getElementById('modal-image');
            modalImage.src = imgSrc; // Set the source of the modal image
        });
    });

    // Delete Modal functionality
    $('#deleteModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const id = button.data('id'); // Extract info from data-* attributes
        const confirmDeleteLink = $('#confirmDelete');
        confirmDeleteLink.attr('href', '/delete_todo/' + id);
    });

    $('input[name="image"]').on('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            // Display the image preview (you can add an img tag for preview)
            $('#imagePreview').attr('src', event.target.result).show();
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const flashMessages = document.querySelectorAll('.alert');
    const flashContainer = document.querySelector('.flash-container'); // Flash mesajların bulunduğu yer

    // Mark as Done ve Delete butonlarına event listener ekle
    document.querySelectorAll('.btn-primary, .btn-danger').forEach(button => {
        button.addEventListener('click', function () {
            const taskTitle = this.closest('.list-group-item').querySelector('h5').innerText;

            // Flash mesajlardan ilgili görevi kaldır
            flashMessages.forEach(message => {
                if (message.innerText.includes(taskTitle)) {
                    message.remove(); // Flash mesajını DOM'dan kaldır
                }
            });
        });
    });
});

// Bildirim gönderme fonksiyonu
function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, {
                body: body,
                icon: '/static/icons/notification-192.png', // İkonu burada özelleştirebilirsiniz
                badge: '/static/icons/alert-192.png'       // Küçük ikon
            });
        }).catch(function (error) {
            console.error('Error in sending notification:', error);
        });
    } else {
        console.log('Notification permission not granted.');
    }
}
