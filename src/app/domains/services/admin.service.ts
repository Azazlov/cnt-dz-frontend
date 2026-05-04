import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, AdminCreateIn, AdminUpdateIn } from '../modules/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api/admins';

  constructor(private http: HttpClient) {}

  getAdmins(includeInactive = false, limit = 50, offset = 0): Observable<{ ok: boolean; admins: Admin[] }> {
    const params = new HttpParams()
      .set('include_inactive', includeInactive.toString())
      .set('limit', limit)
      .set('offset', offset);
    return this.http.get<{ ok: boolean; admins: Admin[] }>(this.apiUrl, { params });
  }

  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${adminId}`);
  }

  createAdmin(admin: AdminCreateIn): Observable<{ ok: boolean; admin: Admin }> {
    return this.http.post<{ ok: boolean; admin: Admin }>(this.apiUrl, admin);
  }

  updateAdmin(adminId: number, admin: AdminUpdateIn): Observable<{ ok: boolean; admin: Admin }> {
    return this.http.patch<{ ok: boolean; admin: Admin }>(`${this.apiUrl}/${adminId}`, admin);
  }

  deleteAdmin(adminId: number, hard = false): Observable<{ ok: boolean; deleted: boolean }> {
    const params = new HttpParams().set('hard', hard.toString());
    return this.http.delete<{ ok: boolean; deleted: boolean }>(`${this.apiUrl}/${adminId}`, { params });
  }
}