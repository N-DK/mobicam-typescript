import { point, DivIcon, PointExpression, MarkerCluster } from 'leaflet';

export const createClusterCustomIcon = (cluster: MarkerCluster): DivIcon => {
    const childCount = cluster.getChildCount();

    return new DivIcon({
        html: `<span class="cluster-icon">${childCount}</span>`,
        className: 'custom-marker-cluster',
        iconSize: point(33, 33, true) as PointExpression,
    }) as DivIcon;
};

export const getDivIcon = (dir: number, state: string) => {
    const markerHtmlStyles = `
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    `;
    return new DivIcon({
        html: `<div style="${markerHtmlStyles}">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="transform: rotate(${dir}deg);" viewBox="0 0 55 114.81"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect class="cls-1" fill="${state}" x="1.64" y="42.64" width="40.99" height="69.7"></rect><rect class="cls-2" x="1.7" y="42.59" width="2.58" height="2.47"></rect><rect class="cls-2" x="40.06" y="42.59" width="2.58" height="2.47"></rect><rect class="cls-2" x="1.7" y="109.88" width="2.58" height="2.47"></rect><rect class="cls-2" x="40.06" y="109.88" width="2.58" height="2.47"></rect><rect class="cls-3" fill="${state}" x="3.01" y="44.12" width="38.25" height="66.74"></rect><path class="cls-4" d="M1.62,112h41v1.67a1.18,1.18,0,0,1-1.18,1.18h-39a.82.82,0,0,1-.82-.82Z"></path><path class="cls-4" d="M40.74,8.63V4.05c-.86-2.79-4.53-4-10.36-4h-16C8.55,0,4.89,1.26,4,4.05V8.63c.15-.65.32-1.24.49-1.83s.38-1.3.55-2h0a2.88,2.88,0,0,1,.66-1.27,3.88,3.88,0,0,1,1.19-.94h0A5.36,5.36,0,0,1,8.4,2.35,3.49,3.49,0,0,0,9.61,2.2a3,3,0,0,1,.79-.49,5.27,5.27,0,0,1,1-.28h0c1.82-.12,3.65-.18,5.48-.21s3.65,0,5.47,0h0c1.82,0,3.64,0,5.47,0s3.66.09,5.48.21h0a5.27,5.27,0,0,1,1,.28,3,3,0,0,1,.79.49,3.49,3.49,0,0,0,1.21.15,5.36,5.36,0,0,1,1.47.19h0A3.88,3.88,0,0,1,39,3.49a3,3,0,0,1,.66,1.27h0c.17.74.36,1.39.54,2S40.59,8,40.74,8.63Z"></path><path class="cls-5" fill="${state}" d="M4.25,42.52H40.52L40.4,22l.18-.32a1.23,1.23,0,0,0,.16-.61V10l-.18,0-.13-1.07c-.16-.74-.35-1.39-.54-2s-.38-1.32-.54-2.07h0a2.74,2.74,0,0,0-.59-1.11,3.47,3.47,0,0,0-1.07-.84,4.7,4.7,0,0,0-1.34-.16,3.27,3.27,0,0,1-1.41-.23h0a2.64,2.64,0,0,0-.7-.43,4.38,4.38,0,0,0-.92-.25c-1.83-.13-3.64-.19-5.46-.22s-3.64,0-5.46,0h-.16c-1.77,0-3.54,0-5.31,0s-3.64.09-5.46.22a4.38,4.38,0,0,0-.92.25,2.49,2.49,0,0,0-.7.43h0a3.3,3.3,0,0,1-1.42.23,4.67,4.67,0,0,0-1.33.16A3.25,3.25,0,0,0,6,3.72a2.74,2.74,0,0,0-.59,1.11h0c-.16.75-.35,1.41-.55,2.07s-.37,1.29-.54,2L4.21,10,4,10V21.1a1.23,1.23,0,0,0,.16.61l.17.32Z"></path><path class="cls-6" d="M4,8.65c.16-.66.33-1.26.5-1.85s.38-1.3.55-2h0a2.88,2.88,0,0,1,.66-1.27,3.88,3.88,0,0,1,1.19-.94h0A5.36,5.36,0,0,1,8.4,2.35,3.49,3.49,0,0,0,9.61,2.2a3,3,0,0,1,.79-.49,5.27,5.27,0,0,1,1-.28h0c1.82-.12,3.65-.18,5.48-.21s3.65,0,5.47,0h0c1.82,0,3.64,0,5.47,0s3.66.09,5.48.21h0a5.27,5.27,0,0,1,1,.28,3,3,0,0,1,.79.49,3.49,3.49,0,0,0,1.21.15,5.36,5.36,0,0,1,1.47.19h0A3.88,3.88,0,0,1,39,3.49a3,3,0,0,1,.66,1.27h0c.17.74.36,1.39.54,2s.35,1.17.5,1.82V10l-.18,0-.13-1.07c-.16-.74-.35-1.39-.54-2s-.38-1.32-.54-2.07h0a2.74,2.74,0,0,0-.59-1.11,3.47,3.47,0,0,0-1.07-.84,4.7,4.7,0,0,0-1.34-.16,3.27,3.27,0,0,1-1.41-.23h0a2.64,2.64,0,0,0-.7-.43,4.38,4.38,0,0,0-.92-.25c-1.83-.13-3.64-.19-5.46-.22s-3.64,0-5.46,0h-.16c-1.77,0-3.54,0-5.31,0s-3.64.09-5.46.22a4.38,4.38,0,0,0-.92.25,2.49,2.49,0,0,0-.7.43h0a3.3,3.3,0,0,1-1.42.23,4.67,4.67,0,0,0-1.33.16A3.25,3.25,0,0,0,6,3.72a2.74,2.74,0,0,0-.59,1.11h0c-.16.75-.35,1.41-.55,2.07s-.37,1.29-.54,2L4.21,10,4,10Z"></path><path class="cls-7" d="M10.53,2.06,9.37,16.32V2.64a1.13,1.13,0,0,0,.46-.15h0A2.65,2.65,0,0,1,10.53,2.06Z"></path><path class="cls-8" d="M6.46,3.28l0,15.21-.21.17,0-15.19A1.9,1.9,0,0,1,6.46,3.28Z"></path><path class="cls-8" d="M7.68,42.42V31.94h0c0-.35,0-.69,0-1a4.83,4.83,0,0,0-.18-.89h0c-.38-1.35-.77-2.54-1.15-3.74s-.76-2.37-1.14-3.71L4.46,22v0L4.35,42.42Zm.2-10.48h0V42.62H4.14v-.1l.12-20.47-.16-.29,0-.06h0a.09.09,0,0,1,0-.06l.16-.12,1.12.94,0,.05c.38,1.35.76,2.55,1.15,3.74S7.28,28.64,7.66,30a4.54,4.54,0,0,1,.18.92A6.93,6.93,0,0,1,7.88,31.94Z"></path><polygon class="cls-9" points="4.9 38.41 4.85 23.12 6.87 29.31 7.2 30.68 7.15 38.9 4.9 38.41"></polygon><rect class="cls-8" x="4.35" y="40.11" width="3.4" height="0.37"></rect><path class="cls-4" d="M5.22,25.69c0-.23,0-.46-.07-.7A21.56,21.56,0,0,0,.7,26.35,3.49,3.49,0,0,0,0,27.83a.46.46,0,0,0,.15.43l3.23-.87A.78.78,0,0,0,3.67,27c0-.22-.06-.55-.08-.76C4.13,26,4.67,25.92,5.22,25.69Z"></path><path class="cls-10" d="M22.38,28.89a118.72,118.72,0,0,0-13.3.75,1.59,1.59,0,0,1-.88-1L5.57,19.28a8.15,8.15,0,0,1,4.11-2.35,74.16,74.16,0,0,1,12.7-1.32,74.27,74.27,0,0,1,12.71,1.32,8.15,8.15,0,0,1,4.11,2.35c-.88,3.11-1.76,6.21-2.63,9.32a1.59,1.59,0,0,1-.88,1A118.76,118.76,0,0,0,22.38,28.89Z"></path><rect class="cls-2" x="40.06" y="42.59" width="2.58" height="2.47"></rect><path class="cls-7" d="M34.24,2.06,35.4,16.32V2.64a1.13,1.13,0,0,1-.46-.15h0A2.65,2.65,0,0,0,34.24,2.06Z"></path><path class="cls-8" d="M38.31,3.28l0,15.21.21.17,0-15.19Z"></path><path class="cls-8" d="M36.89,42.52V31.94h0a6.93,6.93,0,0,1,0-1,4.54,4.54,0,0,1,.18-.92c.38-1.35.77-2.55,1.15-3.74s.77-2.39,1.15-3.74l0-.05,1.13-.94.16.12,0,.06h0l0,.06-.16.29.11,20.47v.1H36.89v-.1Zm.2-10.58V42.42h3.33L40.3,22v0l-.71.59c-.38,1.34-.76,2.53-1.14,3.71s-.77,2.39-1.15,3.74h0a4.83,4.83,0,0,0-.18.89c0,.31,0,.65,0,1Z"></path><polygon class="cls-11" points="39.87 38.41 39.92 23.12 37.89 29.31 37.56 30.68 37.62 38.9 39.87 38.41"></polygon><rect class="cls-8" x="37.02" y="40.11" width="3.4" height="0.37"></rect><path class="cls-4" d="M39.55,25.69c0-.23.05-.46.07-.7a21.56,21.56,0,0,1,4.45,1.36,3.49,3.49,0,0,1,.69,1.48.46.46,0,0,1-.15.43l-3.24-.87A.82.82,0,0,1,41.1,27c0-.22,0-.55.08-.76C40.64,26,40.1,25.92,39.55,25.69Z"></path></g></g></svg>
        </div>`,
        className: '',
    });
};

export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}`;
};

export const localLangue = {
    draw: {
        toolbar: {
            actions: {
                title: 'Hủy bỏ vẽ',
                text: 'Hủy',
            },
            finish: {
                title: 'Hoàn thành vẽ',
                text: 'Hoàn thành',
            },
            undo: {
                title: 'Xóa điểm cuối cùng đã vẽ',
                text: 'Xóa điểm cuối',
            },
            buttons: {
                polyline: 'Vẽ đường thẳng',
                polygon: 'Vẽ đa giác',
                rectangle: 'Vẽ hình chữ nhật',
                circle: 'Vẽ hình tròn',
                marker: 'Vẽ điểm',
                circlemarker: 'Vẽ điểm tròn',
            },
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Nhấp và kéo để vẽ hình tròn.',
                },
                radius: 'Bán kính',
            },
            circlemarker: {
                tooltip: {
                    start: 'Nhấp vào bản đồ để đặt điểm tròn.',
                },
            },
            marker: {
                tooltip: {
                    start: 'Nhấp vào bản đồ để đặt điểm.',
                },
            },
            polygon: {
                tooltip: {
                    start: 'Nhấp để bắt đầu vẽ hình dạng.',
                    cont: 'Nhấp để tiếp tục vẽ hình dạng.',
                    end: 'Nhấp vào điểm đầu tiên để hoàn thành hình dạng.',
                },
            },
            polyline: {
                error: '<strong>Lỗi:</strong> các cạnh hình dạng không được cắt nhau!',
                tooltip: {
                    start: 'Nhấp để bắt đầu vẽ đường thẳng.',
                    cont: 'Nhấp để tiếp tục vẽ đường thẳng.',
                    end: 'Nhấp vào điểm cuối cùng để hoàn thành đường thẳng.',
                },
            },
            rectangle: {
                tooltip: {
                    start: 'Nhấp và kéo để vẽ hình chữ nhật.',
                },
            },
            simpleshape: {
                tooltip: {
                    end: 'Nhả chuột để hoàn thành vẽ.',
                },
            },
        },
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: 'Lưu thay đổi',
                    text: 'Lưu',
                },
                cancel: {
                    title: 'Hủy bỏ chỉnh sửa, bỏ qua tất cả các thay đổi',
                    text: 'Hủy',
                },
                clearAll: {
                    title: 'Xóa tất cả các lớp',
                    text: 'Xóa tất cả',
                },
            },
            buttons: {
                edit: 'Chỉnh sửa lớp',
                editDisabled: 'Không có lớp nào để chỉnh sửa',
                remove: 'Xóa lớp',
                removeDisabled: 'Không có lớp nào để xóa',
            },
        },
        handlers: {
            edit: {
                tooltip: {
                    text: 'Kéo điểm hoặc dấu để chỉnh sửa đối tượng.',
                    subtext: 'Nhấp hủy để bỏ qua thay đổi.',
                },
            },
            remove: {
                tooltip: {
                    text: 'Nhấp vào đối tượng để xóa.',
                },
            },
        },
    },
};
