document.addEventListener('DOMContentLoaded', () => {
    const shapeSelect = document.getElementById('shape');
    const shapeDetailsDiv = document.getElementById('shape-details');
    const shapeImageContainer = document.getElementById('shape-image-container');
    const shapeInfoDiv = document.getElementById('shape-info');
    const resultDiv = document.getElementById('result');

    // Hàm để tải hình ảnh mặc định (được gọi khi tải trang hoặc khi chọn lại "-- Chọn hình --")
    function loadDefaultImageAndMessage() {
        // Encode tên file tiếng Việt cho hình ảnh mặc định
        const defaultImageName = encodeURIComponent('Các hình hình học.png');
        shapeImageContainer.innerHTML = `<img src="images/${defaultImageName}" alt="Các hình hình học" class="default-shape-image">`;
        shapeInfoDiv.innerHTML = `
            <h2>Chào mừng bạn đến với công cụ tính toán hình học!</h2>
            <p>Vui lòng chọn một hình từ danh sách để xem công thức và bắt đầu tính toán.</p>
        `;
    }

    // Gọi hàm này khi trang vừa tải xong
    loadDefaultImageAndMessage();

    // Lắng nghe sự kiện khi người dùng chọn hình từ menu cuộn
    shapeSelect.addEventListener('change', () => {
        const selectedShape = shapeSelect.value;
        shapeInfoDiv.innerHTML = ''; // Xóa nội dung thông tin cũ
        shapeImageContainer.innerHTML = ''; // Xóa hình ảnh cũ

        if (selectedShape) {
            loadShapeDetails(selectedShape); // Tải công thức và form nhập liệu
            displayShapeImage(selectedShape); // Hiển thị hình ảnh tương ứng
        } else {
            // Nếu người dùng chọn "-- Chọn hình --" hoặc không chọn gì
            loadDefaultImageAndMessage(); // Hiển thị lại hình ảnh tổng quát và thông báo ban đầu
        }
    });

    // Hàm hiển thị hình ảnh của hình được chọn
    function displayShapeImage(shape) {
        let rawImageName = ''; // Tên file gốc (có tiếng Việt)
        let altText = '';

        switch (shape) {
            case 'rectangle':
                rawImageName = 'Hình chữ nhật.png';
                altText = 'Hình chữ nhật';
                break;
            case 'square':
                rawImageName = 'Hình vuông.png';
                altText = 'Hình vuông';
                break;
            case 'circle':
                rawImageName = 'Hình tròn.png';
                altText = 'Hình tròn';
                break;
            case 'trapezoid':
                rawImageName = 'Hình thang.png';
                altText = 'Hình thang';
                break;
            default:
                break;
        }

        if (rawImageName) {
            // Mã hóa tên file trước khi dùng trong URL
            const encodedImageName = encodeURIComponent(rawImageName);
            const img = document.createElement('img');
            img.src = `images/${encodedImageName}`; // Sử dụng tên đã mã hóa
            img.alt = altText;
            shapeImageContainer.appendChild(img);
        }
    }

    // Hàm tải thông tin chi tiết (công thức, input) cho hình được chọn
    function loadShapeDetails(shape) {
        let htmlContent = '';

        switch (shape) {
            case 'rectangle':
                htmlContent = `
                    <h2>Hình Chữ Nhật</h2>
                    <p><strong>Công thức:</strong></p>
                    <p>Diện tích (S) = Chiều dài (a) × Chiều rộng (b)</p>
                    <p>Chu vi (P) = 2 × (Chiều dài (a) + Chiều rộng (b))</p>
                    <div class="input-group">
                        <label for="length">Chiều dài (a):</label>
                        <input type="number" id="length" placeholder="Nhập chiều dài" step="any">
                    </div>
                    <div class="input-group">
                        <label for="width">Chiều rộng (b):</label>
                        <input type="number" id="width" placeholder="Nhập chiều rộng" step="any">
                    </div>
                    <button onclick="calculateRectangle()">Tính</button>
                `;
                break;
            case 'square':
                htmlContent = `
                    <h2>Hình Vuông</h2>
                    <p><strong>Công thức:</strong></p>
                    <p>Diện tích (S) = Cạnh (a) × Cạnh (a)</p>
                    <p>Chu vi (P) = 4 × Cạnh (a)</p>
                    <div class="input-group">
                        <label for="side">Cạnh (a):</label>
                        <input type="number" id="side" placeholder="Nhập độ dài cạnh" step="any">
                    </div>
                    <button onclick="calculateSquare()">Tính</button>
                `;
                break;
            case 'circle':
                htmlContent = `
                    <h2>Hình Tròn</h2>
                    <p><strong>Công thức:</strong></p>
                    <p>Diện tích (S) = π × Bán kính (r)²</p>
                    <p>Chu vi (P) = 2 × π × Bán kính (r)</p>
                    <div class="input-group">
                        <label for="radius">Bán kính (r):</label>
                        <input type="number" id="radius" placeholder="Nhập bán kính" step="any">
                    </div>
                    <button onclick="calculateCircle()">Tính</button>
                `;
                break;
            case 'trapezoid':
                htmlContent = `
                    <h2>Hình Thang</h2>
                    <p><strong>Công thức:</strong></p>
                    <p>Diện tích (S) = ((Đáy lớn (a) + Đáy bé (b)) × Chiều cao (h)) / 2</p>
                    <p>Chu vi (P) = Đáy lớn (a) + Đáy bé (b) + Cạnh bên 1 (c) + Cạnh bên 2 (d)</p>
                    <div class="input-group">
                        <label for="base1">Đáy lớn (a):</label>
                        <input type="number" id="base1" placeholder="Nhập độ dài đáy lớn" step="any">
                    </div>
                    <div class="input-group">
                        <label for="base2">Đáy bé (b):</label>
                        <input type="number" id="base2" placeholder="Nhập độ dài đáy bé" step="any">
                    </div>
                    <div class="input-group">
                        <label for="height">Chiều cao (h):</label>
                        <input type="number" id="height" placeholder="Nhập chiều cao" step="any">
                    </div>
                    <div class="input-group">
                        <label for="side1">Cạnh bên 1 (c):</label>
                        <input type="number" id="side1" placeholder="Nhập độ dài cạnh bên 1" step="any">
                    </div>
                    <div class="input-group">
                        <label for="side2">Cạnh bên 2 (d):</label>
                        <input type="number" id="side2" placeholder="Nhập độ dài cạnh bên 2" step="any">
                    </div>
                    <button onclick="calculateTrapezoid()">Tính</button>
                `;
                break;
            default:
                break;
        }
        shapeInfoDiv.innerHTML = htmlContent;
    }

    // --- Các hàm tính toán diện tích và chu vi đã được cải tiến (giữ nguyên từ phiên bản trước) ---

    window.calculateRectangle = () => {
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);

        let resultHtml = '';
        let errors = [];

        // Tính diện tích
        if (!isNaN(length) && length > 0 && !isNaN(width) && width > 0) {
            const area = length * width;
            resultHtml += `<p><strong>Diện tích:</strong> ${area.toFixed(2)}</p>`;
        } else {
            // Chỉ thêm lỗi nếu cả hai đều không hợp lệ hoặc thiếu
            if (isNaN(length) || length <= 0) errors.push("chiều dài");
            if (isNaN(width) || width <= 0) errors.push("chiều rộng");
        }

        // Tính chu vi (công thức giống diện tích, nên chỉ cần kiểm tra lại điều kiện)
        if (!isNaN(length) && length > 0 && !isNaN(width) && width > 0) {
            const perimeter = 2 * (length + width);
            resultHtml += `<p><strong>Chu vi:</strong> ${perimeter.toFixed(2)}</p>`;
        }

        displayResult(resultHtml, errors);
    };

    window.calculateSquare = () => {
        const side = parseFloat(document.getElementById('side').value);

        let resultHtml = '';
        let errors = [];

        if (!isNaN(side) && side > 0) {
            const area = side * side;
            const perimeter = 4 * side;
            resultHtml += `<p><strong>Diện tích:</strong> ${area.toFixed(2)}</p>`;
            resultHtml += `<p><strong>Chu vi:</strong> ${perimeter.toFixed(2)}</p>`;
        } else {
            errors.push("cạnh");
        }

        displayResult(resultHtml, errors);
    };

    window.calculateCircle = () => {
        const radius = parseFloat(document.getElementById('radius').value);
        const PI = Math.PI;

        let resultHtml = '';
        let errors = [];

        if (!isNaN(radius) && radius > 0) {
            const area = PI * radius * radius;
            const perimeter = 2 * PI * radius;
            resultHtml += `<p><strong>Diện tích:</strong> ${area.toFixed(2)}</p>`;
            resultHtml += `<p><strong>Chu vi:</strong> ${perimeter.toFixed(2)}</p>`;
        } else {
            errors.push("bán kính");
        }

        displayResult(resultHtml, errors);
    };

    window.calculateTrapezoid = () => {
        const base1 = parseFloat(document.getElementById('base1').value);
        const base2 = parseFloat(document.getElementById('base2').value);
        const height = parseFloat(document.getElementById('height').value);
        const side1 = parseFloat(document.getElementById('side1').value);
        const side2 = parseFloat(document.getElementById('side2').value);

        let resultHtml = '';
        let errors = [];

        // --- Tính diện tích ---
        let areaErrors = [];
        if (isNaN(base1) || base1 <= 0) areaErrors.push("đáy lớn (a)");
        if (isNaN(base2) || base2 <= 0) areaErrors.push("đáy bé (b)");
        if (isNaN(height) || height <= 0) areaErrors.push("chiều cao (h)");

        if (areaErrors.length === 0) {
            const area = ((base1 + base2) * height) / 2;
            resultHtml += `<p><strong>Diện tích:</strong> ${area.toFixed(2)}</p>`;
        } else {
            errors = errors.concat(areaErrors); // Gộp lỗi nếu không tính được diện tích
        }

        // --- Tính chu vi ---
        let perimeterErrors = [];
        if (isNaN(base1) || base1 <= 0) perimeterErrors.push("đáy lớn (a)");
        if (isNaN(base2) || base2 <= 0) perimeterErrors.push("đáy bé (b)");
        if (isNaN(side1) || side1 <= 0) perimeterErrors.push("cạnh bên 1 (c)");
        if (isNaN(side2) || side2 <= 0) perimeterErrors.push("cạnh bên 2 (d)");

        if (perimeterErrors.length === 0) {
            const perimeter = base1 + base2 + side1 + side2;
            resultHtml += `<p><strong>Chu vi:</strong> ${perimeter.toFixed(2)}</p>`;
        } else {
             perimeterErrors.forEach(err => {
                if (!errors.includes(err)) {
                    errors.push(err);
                }
            });
        }

        // Hiển thị kết quả hoặc lỗi
        if (resultHtml === '' && errors.length > 0) {
            resultDiv.innerHTML = `<p class="error">Vui lòng nhập các giá trị dương hợp lệ cho: ${[...new Set(errors)].join(', ')}.</p>`;
        } else if (resultHtml !== '') {
            resultDiv.innerHTML = resultHtml;
            if (errors.length > 0) {
                 resultDiv.innerHTML += `<p class="error">Lưu ý: Không thể tính được các giá trị liên quan đến: ${[...new Set(errors)].join(', ')} do thiếu hoặc không hợp lệ.</p>`;
            }
        } else {
            resultDiv.innerHTML = '<p class="error">Vui lòng nhập các giá trị cần thiết để tính toán.</p>';
        }
    };

    // Hàm trợ giúp để hiển thị kết quả và lỗi
    function displayResult(htmlContent, errors) {
        if (htmlContent === '' && errors.length > 0) {
            resultDiv.innerHTML = `<p class="error">Vui lòng nhập các giá trị dương hợp lệ cho: ${[...new Set(errors)].join(', ')}.</p>`;
        } else if (htmlContent !== '') {
            resultDiv.innerHTML = htmlContent;
            if (errors.length > 0) {
                resultDiv.innerHTML += `<p class="error">Lưu ý: Không thể tính được các giá trị liên quan đến: ${[...new Set(errors)].join(', ')} do thiếu hoặc không hợp lệ.</p>`;
            }
        } else {
            resultDiv.innerHTML = '<p class="error">Vui lòng nhập các giá trị cần thiết để tính toán.</p>';
        }
    }
});