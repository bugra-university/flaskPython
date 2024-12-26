// static/js/dashboard.js
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
