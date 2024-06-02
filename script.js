            document.getElementById('whatsappButton').addEventListener('click', function() {
                window.location.href = "https://wa.me/3874892729?text=Hola%20me%20interesa%20contactarme%20contigo";
            });

// Función para abrir el modal
        function openModal(src) {
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("img01");
            modal.style.display = "block";
            modalImg.src = src;
        }

// Función para cerrar el modal
        function closeModal() {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        }
