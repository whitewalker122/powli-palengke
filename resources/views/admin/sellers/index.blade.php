<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Sellers - Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        header { background: #4CAF50; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        header h1 { font-size: 24px; }
        .logout-btn { background: #d32f2f; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
        .container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        .table { background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f5f5; font-weight: bold; }
        tr:hover { background: #f9f9f9; }
        .badge { padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .pending { background: #fff3cd; color: #856404; }
        .approved { background: #d4edda; color: #155724; }
        .rejected { background: #f8d7da; color: #721c24; }
        .btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold; margin: 2px; }
        .btn-approve { background: #28a745; color: white; }
        .btn-approve:hover { background: #218838; }
        .btn-reject { background: #d32f2f; color: white; }
        .btn-reject:hover { background: #c62828; }
        .btn-delete { background: #ff9800; color: white; }
        .btn-delete:hover { background: #e68900; }
        .success { background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 20px; }
        .reason-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; }
        .modal-content { background: white; padding: 30px; border-radius: 8px; max-width: 500px; width: 100%; }
        .modal-content h2 { margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        .modal-btn { padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .modal-close { background: #999; }
    </style>
</head>
<body>
    <header>
        <h1>Admin Dashboard - Manage Sellers</h1>
        <div>
            <span>{{ Auth::user()->name }}</span>
            <form method="POST" action="/logout" style="display:inline;">
                @csrf
                <button type="submit" class="logout-btn">Logout</button>
            </form>
        </div>
    </header>

    <div class="container">
        @if(session('success'))
            <div class="success">{{ session('success') }}</div>
        @endif

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Shop Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($sellers as $seller)
                    <tr>
                        <td>{{ $seller->id }}</td>
                        <td>{{ $seller->user->name }}</td>
                        <td>{{ $seller->user->email }}</td>
                        <td>{{ $seller->shop_name }}</td>
                        <td><span class="badge {{ $seller->status }}">{{ ucfirst($seller->status) }}</span></td>
                        <td>
                            @if($seller->status === 'pending')
                                <form method="POST" action="{{ route('admin.sellers.approve', $seller) }}" style="display:inline;">
                                    @csrf
                                    <button type="submit" class="btn btn-approve">Approve</button>
                                </form>
                                <button type="button" class="btn btn-reject" data-seller-id="{{ $seller->id }}" onclick="openRejectModal(this.dataset.sellerId)">Reject</button>
                            @endif
                            <form method="POST" action="{{ route('admin.users.delete', $seller->user) }}" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-delete" onclick="return confirm('Delete this user?')">Delete User</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div style="margin-top: 20px;">
            {{ $sellers->links() }}
        </div>
    </div>

    <!-- Reject Modal -->
    <div id="rejectModal" class="reason-modal">
        <div class="modal-content">
            <h2>Reject Seller</h2>
            <form method="POST" id="rejectForm">
                @csrf
                <div class="form-group">
                    <label for="reason">Rejection Reason</label>
                    <textarea id="reason" name="rejection_reason" required minlength="10" rows="5"></textarea>
                </div>
                <button type="submit" class="modal-btn">Reject</button>
                <button type="button" class="modal-btn modal-close" onclick="closeRejectModal()">Cancel</button>
            </form>
        </div>
    </div>

    <script>
        function openRejectModal(sellerId) {
            document.getElementById('rejectForm').action = '/admin/sellers/' + sellerId + '/reject';
            document.getElementById('rejectModal').style.display = 'flex';
        }
        function closeRejectModal() {
            document.getElementById('rejectModal').style.display = 'none';
        }
    </script>
</body>
</html>
